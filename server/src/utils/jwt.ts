import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export interface JwtPayloadBase {
  sub: string
  role: 'buyer' | 'seller' | 'admin'
}

export function signAccessToken(payload: JwtPayloadBase) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
}

export function signRefreshToken(payload: JwtPayloadBase) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
}

export function verifyAccessToken(token: string): JwtPayloadBase {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayloadBase
}

export function verifyRefreshToken(token: string): JwtPayloadBase {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayloadBase
}
