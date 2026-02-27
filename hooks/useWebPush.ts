import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

// Helper to convert URL-safe base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Helper to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Get subscription from browser
async function getBrowserSubscription() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        return await registration.pushManager.getSubscription();
    } catch (error) {
        console.error('Error getting browser subscription:', error);
        return null;
    }
}

export function useWebPush() {
    const queryClient = useQueryClient();

    // Check subscription status from server
    const { data: statusData, isLoading: statusLoading } = useQuery({
        queryKey: ['push-notification-status'],
        queryFn: async () => {
            const response = await axios.get('/api/notifications/status');
            return response.data as {
                subscribed: boolean;
                subscriptions: Array<{
                    id: string;
                    endpoint: string;
                    userAgent?: string;
                    createdAt: string;
                }>;
            };
        },
        retry: 1,
    });

    // Check browser subscription state (client-side only)
    const { data: browserSubData } = useQuery({
        queryKey: ['browser-push-subscription'],
        queryFn: getBrowserSubscription,
        enabled: typeof window !== 'undefined',
        refetchInterval: 3000, // Check every 3 seconds to detect SW changes
        refetchOnWindowFocus: true,
    });

    // Auto-heal: Check browser vs server subscription state
    useEffect(() => {
        const autoHeal = async () => {
            if (statusLoading || !statusData) return;

            const browserSub = await getBrowserSubscription();
            const serverHasSub = statusData.subscribed;
            const serverEndpoints = statusData.subscriptions.map((s) => s.endpoint);

            // Case 1: Browser has subscription but server doesn't have it
            if (browserSub && !serverEndpoints.includes(browserSub.endpoint)) {
                console.log('🔄 Auto-healing: Syncing browser subscription to server');
                try {
                    const p256dh = arrayBufferToBase64(browserSub.getKey('p256dh')!);
                    const auth = arrayBufferToBase64(browserSub.getKey('auth')!);

                    await axios.post('/api/notifications/subscribe', {
                        endpoint: browserSub.endpoint,
                        p256dh,
                        auth,
                        userAgent: navigator.userAgent,
                    });

                    queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
                    toast.success('Notifications synced across devices');
                } catch (error) {
                    console.error('Auto-heal failed:', error);
                }
            }

            // Case 2: Server has subscriptions but browser doesn't (SW unregistered/cleared)
            // Auto-cleanup stale server subscriptions for THIS device
            if (!browserSub && serverHasSub && statusData.subscriptions.length > 0) {
                console.log('🧹 Auto-cleanup: Browser has no subscription, cleaning server...');

                // Try to identify and remove this device's subscription
                // We'll remove subscriptions that match this user agent or look stale
                try {
                    const currentUA = navigator.userAgent;
                    const thisDeviceSubs = statusData.subscriptions.filter(
                        sub => sub.userAgent === currentUA
                    );

                    if (thisDeviceSubs.length > 0) {
                        console.log(`Found ${thisDeviceSubs.length} subscription(s) for this device`);

                        // Unsubscribe from each matching endpoint
                        for (const sub of thisDeviceSubs) {
                            try {
                                await axios.post('/api/notifications/unsubscribe', {
                                    endpoint: sub.endpoint,
                                });
                                console.log('✅ Cleaned up stale subscription:', sub.id);
                            } catch (error) {
                                console.error('Failed to cleanup subscription:', error);
                            }
                        }

                        queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
                        console.log('✅ Database cleaned up for this device');
                    }
                } catch (error) {
                    console.error('Auto-cleanup failed:', error);
                }
            }
        };

        autoHeal();
    }, [statusData, statusLoading, queryClient, browserSubData]);

    // Subscribe to push notifications
    const subscribe = useMutation({
        mutationFn: async () => {
            // Check if browser supports notifications
            if (!('serviceWorker' in navigator)) {
                throw new Error('Service workers are not supported in this browser');
            }

            if (!('PushManager' in window)) {
                throw new Error('Push messaging is not supported in this browser');
            }

            // Request permission
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Notification permission denied');
            }

            // Get VAPID public key
            const { data: vapidData } = await axios.get<{ publicKey: string }>(
                '/api/notifications/vapid-public-key'
            );

            // Get service worker registration
            const registration = await navigator.serviceWorker.ready;

            // Check existing subscription
            let subscription = await registration.pushManager.getSubscription();

            // If no subscription exists, create one
            if (!subscription) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidData.publicKey),
                });
            }

            // Convert keys to base64
            const p256dh = arrayBufferToBase64(subscription.getKey('p256dh')!);
            const auth = arrayBufferToBase64(subscription.getKey('auth')!);

            // Send to server
            const response = await axios.post('/api/notifications/subscribe', {
                endpoint: subscription.endpoint,
                p256dh,
                auth,
                userAgent: navigator.userAgent,
            });

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
            toast.success('🔔 Notifications enabled successfully!');
        },
        onError: (error) => {
            console.error('Subscribe error:', error);
            let message = 'Failed to enable notifications';
            if (isAxiosError(error)) {
                message = error.response?.data?.error || error.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            toast.error(message);
        },
    });

    // Unsubscribe from push notifications
    const unsubscribe = useMutation({
        mutationFn: async () => {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                await subscription.unsubscribe();

                await axios.post('/api/notifications/unsubscribe', {
                    endpoint: subscription.endpoint,
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
            toast.success('Notifications disabled');
        },
        onError: (error) => {
            console.error('Unsubscribe error:', error);
            let message = 'Failed to disable notifications';
            if (isAxiosError(error)) {
                message = error.response?.data?.error || error.message || message;
            }
            toast.error(message);
        },
    });

    // Send test notification
    const sendTest = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/notifications/test');
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || 'Test notification sent!');
        },
        onError: (error) => {
            console.error('Test notification error:', error);
            let message = 'Failed to send test notification';
            if (isAxiosError(error)) {
                message = error.response?.data?.error || message;
            }
            toast.error(message);
        },
    });

    // Only consider truly subscribed if BOTH browser and server agree
    const hasBrowserSubscription = browserSubData !== null;
    const hasServerSubscription = statusData?.subscribed ?? false;
    const isFullySubscribed = hasBrowserSubscription && hasServerSubscription;

    return {
        isSubscribed: isFullySubscribed,
        subscriptions: statusData?.subscriptions ?? [],
        isLoading: statusLoading,
        subscribe,
        unsubscribe,
        sendTest,
    };
}
