import { auth } from '@/lib/auth';
import { prisma_db } from '@/lib/prisma';
import { sendPushNotification } from '@/lib/web-push';
import { PushSubscription } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const sendSchema = z.object({
    userId: z.string(),
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Body is required'),
    url: z.string().optional(),
    icon: z.string().optional(),
    badge: z.string().optional(),
    data: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { userId, title, body: messageBody, url, icon, badge, data } = sendSchema.parse(body);

        // Get all subscriptions for the target user
        const subscriptions = await prisma_db.pushSubscription.findMany({
            where: { userId },
        });

        if (subscriptions.length === 0) {
            return NextResponse.json(
                { error: 'User has no active push subscriptions' },
                { status: 404 }
            );
        }

        const payload = {
            title,
            body: messageBody,
            url,
            icon: icon || '/icon-192x192.png',
            badge: badge || '/badge-72x72.png',
            data,
        };

        // Send notification to all user's devices
        const results = await Promise.all(
            subscriptions.map(async (sub: PushSubscription) => {
                const result = await sendPushNotification(sub, payload);

                // Remove expired subscriptions
                if (result.expired) {
                    await prisma_db.pushSubscription.delete({
                        where: { id: sub.id },
                    });
                }

                return {
                    endpoint: sub.endpoint,
                    ...result,
                };
            })
        );

        const successCount = results.filter((r) => (r as { success: boolean }).success).length;
        const failedCount = results.filter((r) => !(r as { success: boolean }).success).length;

        return NextResponse.json({
            message: `Sent to ${successCount} device(s)`,
            successCount,
            failedCount,
            results,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error('Send notification error:', error);
        return NextResponse.json(
            { error: 'Failed to send notification' },
            { status: 500 }
        );
    }
}
