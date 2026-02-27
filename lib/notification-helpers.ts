/**
 * Notification Helper Utilities
 * 
 * Easy-to-use functions for sending notifications to users
 */

export interface NotificationPayload {
    userId: string;
    title: string;
    body: string;
    url?: string;
    icon?: string;
    data?: Record<string, unknown>;
}

export interface NotificationResult {
    success: boolean;
    message: string;
    user?: {
        id: string;
        name: string | null;
        email: string | null;
    };
    summary?: {
        totalDevices: number;
        successful: number;
        failed: number;
    };
    devices?: Array<{
        endpoint: string;
        success: boolean;
        error?: string;
    }>;
    error?: string;
}

/**
 * Send a notification to a specific user
 * 
 * @example
 * ```typescript
 * import { notifyUser } from '@/lib/notification-helpers';
 * 
 * const result = await notifyUser({
 *   userId: 'user_123',
 *   title: 'New Message',
 *   body: 'You have a new message from John',
 *   url: '/messages',
 *   data: { messageId: '123' }
 * });
 * 
 * if (result.success) {
 *   console.log(`Sent to ${result.summary.successful} devices`);
 * }
 * ```
 */
export async function notifyUser(payload: NotificationPayload): Promise<NotificationResult> {
    try {
        const response = await fetch('/api/notifications/send-to-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.error || 'Failed to send notification',
                error: result.error,
            };
        }

        return {
            success: true,
            ...result,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Network error',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Check if a user has notifications enabled
 * 
 * @example
 * ```typescript
 * import { getUserNotificationStatus } from '@/lib/notification-helpers';
 * 
 * const status = await getUserNotificationStatus('user_123');
 * if (status.notificationsEnabled) {
 *   console.log(`User has ${status.deviceCount} devices`);
 * }
 * ```
 */
export async function getUserNotificationStatus(userId: string) {
    try {
        const response = await fetch(`/api/notifications/send-to-user?userId=${userId}`);
        const result = await response.json();

        if (!response.ok) {
            return {
                notificationsEnabled: false,
                deviceCount: 0,
                error: result.error,
            };
        }

        return result;
    } catch (error) {
        return {
            notificationsEnabled: false,
            deviceCount: 0,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Server-side notification helper (use in API routes or server actions)
 * 
 * @example
 * ```typescript
 * import { notifyUserServer } from '@/lib/notification-helpers';
 * 
 * // In an API route or server action
 * export async function createPost(userId: string, title: string) {
 *   // ... create post logic
 *   
 *   // Notify the user
 *   await notifyUserServer({
 *     userId,
 *     title: 'Post Published',
 *     body: `Your post "${title}" is now live!`,
 *     url: `/posts/${postId}`,
 *   });
 * }
 * ```
 */
export async function notifyUserServer(payload: NotificationPayload): Promise<NotificationResult> {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:2222';

    try {
        const response = await fetch(`${baseUrl}/api/notifications/send-to-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.error || 'Failed to send notification',
                error: result.error,
            };
        }

        return {
            success: true,
            ...result,
        };
    } catch (error) {
        console.error('Server notification error:', error);
        return {
            success: false,
            message: 'Failed to send notification',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Notify multiple users at once
 * 
 * @example
 * ```typescript
 * import { notifyMultipleUsers } from '@/lib/notification-helpers';
 * 
 * const results = await notifyMultipleUsers(
 *   ['user_1', 'user_2', 'user_3'],
 *   {
 *     title: 'New Feature',
 *     body: 'Check out our new dashboard!',
 *     url: '/dashboard',
 *   }
 * );
 * 
 * console.log(`Sent to ${results.filter(r => r.success).length} users`);
 * ```
 */
export async function notifyMultipleUsers(
    userIds: string[],
    notification: Omit<NotificationPayload, 'userId'>
): Promise<NotificationResult[]> {
    const results = await Promise.all(
        userIds.map(userId =>
            notifyUser({
                userId,
                ...notification,
            })
        )
    );

    return results;
}
