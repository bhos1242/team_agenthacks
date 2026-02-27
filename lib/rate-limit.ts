import { prisma_db } from "./prisma";

export type RateLimitAction = "resend-otp" | "forgot-password";

interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number;
}

const rateLimitConfigs: Record<RateLimitAction, RateLimitConfig> = {
  "resend-otp": {
    maxAttempts: 1, // 1 attempt per window (enforces 60s cooldown)
    windowMinutes: 1, // 1 minute window
  },
  "forgot-password": {
    maxAttempts: 3, // 3 attempts per window
    windowMinutes: 60, // 1 hour window
  },
};

/**
 * Check if rate limit has been exceeded
 * @param identifier - User identifier (email or IP)
 * @param action - Action being rate limited
 * @returns Object with isAllowed flag and optional retry time
 */
export async function checkRateLimit(
  identifier: string,
  action: RateLimitAction
): Promise<{ isAllowed: boolean; retryAfter?: Date }> {
  const config = rateLimitConfigs[action];
  const now = new Date();

  try {
    // Find existing rate limit record
    const record = await prisma_db.rateLimit.findUnique({
      where: {
        identifier_action: {
          identifier,
          action,
        },
      },
    });

    // No existing record - allow and create new
    if (!record) {
      const resetAt = new Date(now.getTime() + config.windowMinutes * 60 * 1000);
      await prisma_db.rateLimit.create({
        data: {
          identifier,
          action,
          count: 1,
          resetAt,
        },
      });
      return { isAllowed: true };
    }

    // Check if reset window has passed
    if (now >= record.resetAt) {
      // Reset the counter
      const resetAt = new Date(now.getTime() + config.windowMinutes * 60 * 1000);
      await prisma_db.rateLimit.update({
        where: { id: record.id },
        data: {
          count: 1,
          resetAt,
          updatedAt: now,
        },
      });
      return { isAllowed: true };
    }

    // Within window - check if limit exceeded
    if (record.count >= config.maxAttempts) {
      return {
        isAllowed: false,
        retryAfter: record.resetAt,
      };
    }

    // Increment counter
    await prisma_db.rateLimit.update({
      where: { id: record.id },
      data: {
        count: record.count + 1,
        updatedAt: now,
      },
    });

    return { isAllowed: true };
  } catch (error) {
    console.error("Error checking rate limit:", error);
    // On error, allow the action (fail open)
    return { isAllowed: true };
  }
}

/**
 * Reset rate limit for a specific identifier and action
 * @param identifier - User identifier
 * @param action - Action to reset
 */
export async function resetRateLimit(
  identifier: string,
  action: RateLimitAction
): Promise<void> {
  try {
    await prisma_db.rateLimit.delete({
      where: {
        identifier_action: {
          identifier,
          action,
        },
      },
    });
  } catch (error) {
    // Ignore errors (record might not exist)
    console.error("Error resetting rate limit:", error);
  }
}

/**
 * Clean up expired rate limit records (can be called periodically)
 */
export async function cleanupExpiredRateLimits(): Promise<void> {
  try {
    await prisma_db.rateLimit.deleteMany({
      where: {
        resetAt: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error("Error cleaning up rate limits:", error);
  }
}
