import { Router, Request, Response } from 'express'

export const router = Router()

// GET /v1/channels
router.get('/', (_req: Request, res: Response) => {
  res.json({ total: 0, page: 1, limit: 20, items: [] })
})

// POST /v1/channels (stub)
router.post('/', (_req: Request, res: Response) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Create channel not implemented yet' } })
})

// GET /v1/channels/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({ id, name: 'stub', platform: 'YouTube' })
})
