/**
 * Simple in-memory rate limiter for serverless API routes.
 * Uses a sliding window per IP. Resets automatically via Map TTL cleanup.
 */
const store = new Map();

/**
 * @param {string} ip
 * @param {number} limit - max requests
 * @param {number} windowMs - window in milliseconds
 * @returns {{ allowed: boolean, remaining: number }}
 */
export function rateLimit(ip, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const key = `${ip}`;
  const entry = store.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count += 1;
  store.set(key, entry);

  // Cleanup stale entries every 500 calls to prevent memory growth
  if (store.size > 500) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
  };
}
