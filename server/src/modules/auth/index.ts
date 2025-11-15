import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { User } from '../../modules/users/model'
import { hashPassword, comparePassword } from '../../utils/hash'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt'
import { env } from '../../config/env'
import { authGuard } from '../../middleware/auth'

export const router = Router()

const registerBody = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['buyer','seller']).default('buyer'),
})

router.post('/register', async (req: Request, res: Response) => {
  const body = registerBody.parse(req.body)
  const exists = await User.findOne({ email: body.email.toLowerCase() })
  if (exists) return res.status(409).json({ error: { code: 'EMAIL_TAKEN', message: 'Email already registered' } })
  const passwordHash = await hashPassword(body.password)
  const user = await User.create({
    name: body.name,
    email: body.email.toLowerCase(),
    passwordHash,
    role: body.role,
  })
  const accessToken = signAccessToken({ sub: String(user._id), role: user.role })
  const refreshToken = signRefreshToken({ sub: String(user._id), role: user.role })
  user.refreshTokenHash = await hashPassword(refreshToken)
  await user.save()
  setRefreshCookie(res, refreshToken)
  res.json({ user: safeUser(user), accessToken })
})

const loginBody = z.object({ email: z.string().email(), password: z.string().min(8) })
router.post('/login', async (req: Request, res: Response) => {
  const body = loginBody.parse(req.body)
  const user = await User.findOne({ email: body.email.toLowerCase() })
  if (!user) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } })
  const ok = await comparePassword(body.password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } })
  const accessToken = signAccessToken({ sub: String(user._id), role: user.role })
  const refreshToken = signRefreshToken({ sub: String(user._id), role: user.role })
  user.refreshTokenHash = await hashPassword(refreshToken)
  await user.save()
  setRefreshCookie(res, refreshToken)
  res.json({ user: safeUser(user), accessToken })
})

router.post('/refresh', async (req: Request, res: Response) => {
  const token = readRefreshCookie(req)
  if (!token) return res.status(401).json({ error: { code: 'NO_REFRESH', message: 'Missing refresh token' } })
  let payload: any
  try {
    payload = verifyRefreshToken(token)
  } catch {
    return res.status(401).json({ error: { code: 'INVALID_REFRESH', message: 'Invalid refresh token' } })
  }
  const user = await User.findById(payload.sub)
  if (!user || !user.refreshTokenHash) return res.status(401).json({ error: { code: 'INVALID_REFRESH', message: 'Invalid session' } })
  const matches = await comparePassword(token, user.refreshTokenHash)
  if (!matches) return res.status(401).json({ error: { code: 'INVALID_REFRESH', message: 'Token rotated/revoked' } })
  const newAccess = signAccessToken({ sub: String(user._id), role: user.role })
  const newRefresh = signRefreshToken({ sub: String(user._id), role: user.role })
  user.refreshTokenHash = await hashPassword(newRefresh)
  await user.save()
  setRefreshCookie(res, newRefresh)
  res.json({ accessToken: newAccess })
})

router.post('/logout', async (req: Request, res: Response) => {
  const token = readRefreshCookie(req)
  if (token) clearRefreshCookie(res)
  // Optional: revoke by clearing stored hash
  const payload = safeDecodeRefresh(token)
  if (payload?.sub) await User.findByIdAndUpdate(payload.sub, { $unset: { refreshTokenHash: 1 } })
  res.status(204).send()
})

router.get('/me', authGuard, async (req: Request, res: Response) => {
  const user = await User.findById((req as any).user.sub)
  if (!user) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'User not found' } })
  res.json({ user: safeUser(user) })
})

function safeUser(u: any) {
  return { id: String(u._id), name: u.name, email: u.email, role: u.role, avatarUrl: u.avatarUrl }
}

function setRefreshCookie(res: Response, token: string) {
  const isProd = env.NODE_ENV === 'production'
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/v1/auth',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
}

function clearRefreshCookie(res: Response) {
  const isProd = env.NODE_ENV === 'production'
  res.cookie('refresh_token', '', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax', path: '/v1/auth', maxAge: 0 })
}

function readRefreshCookie(req: Request) {
  const cookie = req.headers.cookie || ''
  const match = cookie.split(';').map((s) => s.trim()).find((c) => c.startsWith('refresh_token='))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function safeDecodeRefresh(token: string | null) {
  try { return token ? verifyRefreshToken(token) : null } catch { return null }
}
