// ============================================================================
// ANANTA LABS INDIA — RATE LIMITER & ABUSE PREVENTION
// Sliding-window memory rate limiter for AI conversation requests.
// ============================================================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up expired keys every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks if a client identifier (IP or session) has exceeded rate limits.
 * Default: 25 requests per 60 seconds.
 */
export function checkRateLimit(
  clientId: string,
  maxRequests: number = 25,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientId, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: Math.max(0, record.resetAt - now),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInMs: Math.max(0, record.resetAt - now),
  };
}
