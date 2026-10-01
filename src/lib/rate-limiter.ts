// Production Distributed & In-Memory Rate Limiter

const inMemoryRateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetInSeconds: number
}

export async function checkRateLimit(
  ip: string,
  maxRequests = MAX_REQUESTS_PER_WINDOW,
  windowMs = RATE_LIMIT_WINDOW_MS,
): Promise<boolean> {
  const result = await checkRateLimitDetails(ip, maxRequests, windowMs)
  return result.allowed
}

export async function checkRateLimitDetails(
  ip: string,
  maxRequests = MAX_REQUESTS_PER_WINDOW,
  windowMs = RATE_LIMIT_WINDOW_MS,
): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const redisToken =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

  // If Upstash / Vercel KV is configured in distributed production, use REST API
  if (redisUrl && redisToken) {
    try {
      const windowSeconds = Math.ceil(windowMs / 1000)
      const key = `rate_limit:inquiry:${ip}`

      // Increment counter in Redis
      const incrRes = await fetch(`${redisUrl}/incr/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      })

      if (incrRes.ok) {
        const incrData = await incrRes.json()
        const count = incrData.result as number

        // Set expiration on first hit
        if (count === 1) {
          await fetch(
            `${redisUrl}/expire/${encodeURIComponent(key)}/${windowSeconds}`,
            {
              headers: { Authorization: `Bearer ${redisToken}` },
            },
          )
        }

        if (count > maxRequests) {
          return {
            allowed: false,
            remaining: 0,
            resetInSeconds: windowSeconds,
          }
        }

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - count),
          resetInSeconds: windowSeconds,
        }
      }
    } catch (err) {
      console.warn('⚠️ Distributed rate limiter fallback to in-memory:', err)
    }
  }

  // Fallback: Local In-Memory Sliding Window
  const now = Date.now()
  const timestamps = inMemoryRateLimitMap.get(ip) || []
  const validTimestamps = timestamps.filter((t) => now - t < windowMs)

  if (validTimestamps.length >= maxRequests) {
    inMemoryRateLimitMap.set(ip, validTimestamps)
    const oldest = validTimestamps[0]
    const resetInSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000))
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    }
  }

  validTimestamps.push(now)
  inMemoryRateLimitMap.set(ip, validTimestamps)
  return {
    allowed: true,
    remaining: maxRequests - validTimestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  }
}

export function resetRateLimits(): void {
  inMemoryRateLimitMap.clear()
}
