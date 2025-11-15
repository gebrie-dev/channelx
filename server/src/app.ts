import express, { Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { env } from './config/env'
import { errorHandler, notFoundHandler } from './middleware/error'
import { router as api } from './routes'
import { mountApiDocs } from './openapi'
import { rateLimit } from './middleware/rate-limit'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')

  app.use(helmet())
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
  app.use(express.json({ limit: '1mb' }))
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  app.use(rateLimit({ windowMs: 60_000, max: 120 }))

  app.get('/health', (_req: Request, res: Response) => res.status(200).json({ ok: true }))
  mountApiDocs(app)
  app.use('/v1', api)

  app.use(notFoundHandler)
  app.use(errorHandler)
  return app
}
