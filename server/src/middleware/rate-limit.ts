import type { NextFunction, Request, Response } from 'express'

// Simple in-memory IP-based rate limiter. For production, consider Redis.
export function rateLimit({ windowMs = 60_000, max = 100 }: { windowMs?: number; max?: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>()

  function keyFor(req: Request) {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
    return ip
  }

  return function limiter(req: Request, res: Response, next: NextFunction) {
    const now = Date.now()
    const key = keyFor(req)
    const rec = hits.get(key)
    if (!rec || now > rec.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      return next()
    }
    if (rec.count >= max) {
      const retryAfterSec = Math.ceil((rec.resetAt - now) / 1000)
      res.setHeader('Retry-After', String(retryAfterSec))
      return res.status(429).json({ error: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later.' } })
    }
    rec.count += 1
    return next()
  }
}
