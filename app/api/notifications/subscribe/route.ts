import { auth } from '@/lib/auth';
import { prisma_db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
    endpoint: z.string().url(),
    p256dh: z.string(),
    auth: z.string(),
    userAgent: z.string().optional(),
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
        const data = subscribeSchema.parse(body);

        // Check if subscription already exists
        const existing = await prisma_db.pushSubscription.findFirst({
            where: {
                userId: session.user.id,
                endpoint: data.endpoint,
            },
        });

        if (existing) {
            // Update existing subscription
            const updated = await prisma_db.pushSubscription.update({
                where: { id: existing.id },
                data: {
                    p256dh: data.p256dh,
                    auth: data.auth,
                    userAgent: data.userAgent,
                    updatedAt: new Date(),
                },
            });

            return NextResponse.json({
                message: 'Subscription updated successfully',
                subscription: updated,
            });
        }

        // Create new subscription
        const subscription = await prisma_db.pushSubscription.create({
            data: {
                userId: session.user.id,
                endpoint: data.endpoint,
                p256dh: data.p256dh,
                auth: data.auth,
                userAgent: data.userAgent,
            },
        });

        return NextResponse.json({
            message: 'Subscribed successfully',
            subscription,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error('Subscribe error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe to notifications' },
            { status: 500 }
        );
    }
}
