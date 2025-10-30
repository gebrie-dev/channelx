import type { NextFunction, Request, Response } from 'express'

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } })
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || err.statusCode || 500
  const code = err.code || 'INTERNAL_ERROR'
  const message = err.message || 'Something went wrong'
  const details = err.details
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err)
  }
  res.status(status).json({ error: { code, message, details } })
}
