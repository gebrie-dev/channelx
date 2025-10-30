import 'dotenv/config'

function required(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback
  if (v === undefined) {
    throw new Error(`Missing required env var ${name}`)
  }
  return v
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(required('PORT', '4000')),
  DATABASE_URL: required('DATABASE_URL', 'mongodb://localhost:27017/channelx'),
  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET', 'dev-access-secret'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET', 'dev-refresh-secret'),
  CORS_ORIGIN: required('CORS_ORIGIN', 'http://localhost:3000'),
} as const
