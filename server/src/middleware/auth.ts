import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')
  if (!token) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing bearer token' } })
  }
  try {
    const payload = verifyAccessToken(token)
    ;(req as any).user = payload
    return next()
  } catch {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } })
  }
}

export function roleGuard(...roles: Array<'buyer' | 'seller' | 'admin'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as { role?: 'buyer' | 'seller' | 'admin' } | undefined
    if (!user || !user.role) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } })
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient role' } })
    }
    return next()
  }
}
