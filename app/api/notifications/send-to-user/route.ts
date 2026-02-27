import { prisma_db } from '@/lib/prisma';
import { sendPushNotification } from '@/lib/web-push';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const sendToUserSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Body is required'),
    url: z.string().optional(),
    icon: z.string().optional(),
    data: z.any().optional(),
});

/**
 * POST /api/notifications/send-to-user
 * 
 * Send a push notification to all devices of a specific user
 * 
 * Example request:
 * {
 *   "userId": "user_123",
 *   "title": "Hello!",
 *   "body": "This is a test notification",
 *   "url": "/dashboard",
 *   "data": { "action": "view_item", "itemId": "123" }
 * }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = sendToUserSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: validation.error.issues.map(i => ({
                        field: i.path.join('.'),
                        message: i.message
                    }))
                },
                { status: 400 }
            );
        }

        const { userId, title, body: messageBody, url, icon, data } = validation.data;

        // Check if user exists
        const user = await prisma_db.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Get all push subscriptions for this user
        const subscriptions = await prisma_db.pushSubscription.findMany({
            where: { userId },
        });

        if (subscriptions.length === 0) {
            return NextResponse.json(
                {
                    error: 'User has no active push subscriptions',
                    message: 'The user needs to enable notifications in their browser first'
                },
                { status: 404 }
            );
        }

        // Prepare notification payload
        const payload = {
            title,
            body: messageBody,
            url: url || '/',
            icon: icon || '/icon.svg',
            badge: '/icon.svg',
            data: data || {},
        };

        // Send notification to all user's subscribed devices
        const results = await Promise.allSettled(
            subscriptions.map(async (subscription) => {
                try {
                    const result = await sendPushNotification(subscription, payload);

                    // Remove expired/invalid subscriptions
                    if (result.expired || !result.success) {
                        await prisma_db.pushSubscription.delete({
                            where: { id: subscription.id },
                        }).catch(console.error);
                    }

                    return {
                        endpoint: subscription.endpoint.substring(0, 50) + '...',
                        userAgent: subscription.userAgent,
                        success: result.success,
                        error: result.error,
                    };
                } catch (error) {
                    return {
                        endpoint: subscription.endpoint.substring(0, 50) + '...',
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error',
                    };
                }
            })
        );

        // Process results
        const deviceResults = results.map(r =>
            r.status === 'fulfilled' ? r.value : { success: false, error: 'Promise rejected' }
        );

        const successCount = deviceResults.filter(r => r.success).length;
        const failedCount = deviceResults.filter(r => !r.success).length;

        return NextResponse.json({
            success: true,
            message: `Notification sent to ${successCount} of ${subscriptions.length} device(s)`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            summary: {
                totalDevices: subscriptions.length,
                successful: successCount,
                failed: failedCount,
            },
            devices: deviceResults,
        });

    } catch (error) {
        console.error('Send notification to user error:', error);
        return NextResponse.json(
            {
                error: 'Failed to send notification',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/notifications/send-to-user?userId=user_123
 * 
 * Send a test notification (convenience for quick testing via browser URL)
 * 
 * Examples:
 * - Basic: ?userId=user_123
 * - Custom: ?userId=user_123&title=Hello&body=World&url=/page
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'userId query parameter is required' },
                { status: 400 }
            );
        }

        // Get user and their subscriptions
        const user = await prisma_db.user.findUnique({
            where: { id: userId },
            include: {
                pushSubscriptions: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (user.pushSubscriptions.length === 0) {
            return NextResponse.json(
                {
                    error: 'User has no active push subscriptions',
                    message: 'Please enable notifications in your browser first',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                },
                { status: 404 }
            );
        }

        // Get custom parameters or use defaults
        const title = searchParams.get('title') || '🔔 Test Notification';
        const body = searchParams.get('body') || 'This is a test notification sent via GET request!';
        const url = searchParams.get('url') || '/dashboard';

        const payload = {
            title,
            body,
            url,
            icon: '/icon.svg',
            badge: '/icon.svg',
            data: { test: true, method: 'GET', timestamp: new Date().toISOString() },
        };

        // Send to all user's devices
        const results = await Promise.allSettled(
            user.pushSubscriptions.map(async (subscription) => {
                try {
                    const result = await sendPushNotification(subscription, payload);

                    // Remove expired/invalid subscriptions
                    if (result.expired || !result.success) {
                        await prisma_db.pushSubscription.delete({
                            where: { id: subscription.id },
                        }).catch(console.error);
                    }

                    return {
                        endpoint: subscription.endpoint.substring(0, 50) + '...',
                        userAgent: subscription.userAgent,
                        success: result.success,
                    };
                } catch (error) {
                    return {
                        endpoint: subscription.endpoint.substring(0, 50) + '...',
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error',
                    };
                }
            })
        );

        const deviceResults = results.map(r =>
            r.status === 'fulfilled' ? r.value : { success: false, error: 'Promise rejected' }
        );

        const successCount = deviceResults.filter(r => r.success).length;
        const failedCount = deviceResults.filter(r => !r.success).length;

        return NextResponse.json({
            success: true,
            message: `✅ Test notification sent to ${successCount} of ${user.pushSubscriptions.length} device(s)!`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            notification: {
                title,
                body,
                url,
            },
            summary: {
                totalDevices: user.pushSubscriptions.length,
                successful: successCount,
                failed: failedCount,
            },
            devices: deviceResults,
            tip: 'Customize with: ?userId=xxx&title=Hello&body=World&url=/page',
        });

    } catch (error) {
        console.error('Send test notification error:', error);
        return NextResponse.json(
            {
                error: 'Failed to send notification',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
