import webpush from 'web-push';

// Validate environment variables
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:noreply@example.com';

if (!vapidPublicKey || !vapidPrivateKey) {
    console.warn(
        'VAPID keys are not configured. Run: pnpm run generate:vapid'
    );
}

// Configure web-push
if (vapidPublicKey && vapidPrivateKey) {
    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
}

export { webpush };

export function getVapidPublicKey() {
    if (!vapidPublicKey) {
        throw new Error('VAPID_PUBLIC_KEY is not configured');
    }
    return vapidPublicKey;
}

// Helper function to send notification
export async function sendPushNotification(
    subscription: {
        endpoint: string;
        p256dh: string;
        auth: string;
    },
    payload: {
        title: string;
        body: string;
        url?: string;
        icon?: string;
        badge?: string;
        data?: Record<string, unknown>;
    }
) {
    try {
        const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
            },
        };

        await webpush.sendNotification(
            pushSubscription,
            JSON.stringify(payload)
        );

        return { success: true };
    } catch (error) {
        // Handle subscription expiration (410 Gone)
        const err = error as { statusCode?: number };
        if (err.statusCode === 410 || err.statusCode === 404) {
            return { success: false, expired: true, error };
        }
        return { success: false, expired: false, error };
    }
}
