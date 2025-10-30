import { Router, Request, Response } from 'express'

export const router = Router()

router.post('/register', (_req: Request, res: Response) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Register not implemented yet' } })
})

router.post('/login', (_req: Request, res: Response) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Login not implemented yet' } })
})

router.post('/refresh', (_req: Request, res: Response) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Refresh not implemented yet' } })
})

router.get('/me', (_req: Request, res: Response) => {
  res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Auth required' } })
})
