// Sliding window in-memory rate limiter
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

export function checkRateLimit(
  ip: string,
  maxRequests = MAX_REQUESTS_PER_WINDOW,
  windowMs = RATE_LIMIT_WINDOW_MS,
): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const validTimestamps = timestamps.filter((t) => now - t < windowMs)

  if (validTimestamps.length >= maxRequests) {
    rateLimitMap.set(ip, validTimestamps)
    return false
  }

  validTimestamps.push(now)
  rateLimitMap.set(ip, validTimestamps)
  return true
}

export function resetRateLimits(): void {
  rateLimitMap.clear()
}
