import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { Channel } from './model'
import { authGuard, roleGuard } from '../../middleware/auth'

export const router = Router()

const listQuery = z.object({
  search: z.string().optional(),
  platform: z.enum(['YouTube','TikTok','Instagram','Twitter','Twitch','Telegram']).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  minFollowers: z.coerce.number().nonnegative().optional(),
  niche: z.string().optional(),
  verified: z.coerce.boolean().optional(),
  sort: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
})

// GET /v1/channels
router.get('/', async (req: Request, res: Response) => {
  const q = listQuery.parse(req.query)
  const filter: any = {}
  if (q.search) filter.$text = { $search: q.search }
  if (q.platform) filter.platform = q.platform
  if (q.niche) filter.niche = q.niche
  if (typeof q.verified === 'boolean') filter.verification = q.verified
  if (q.minFollowers) filter.subscribers = { ...(filter.subscribers||{}), $gte: q.minFollowers }
  if (q.minPrice || q.maxPrice) {
    filter.askingPrice = {}
    if (q.minPrice) filter.askingPrice.$gte = q.minPrice
    if (q.maxPrice) filter.askingPrice.$lte = q.maxPrice
  }

  let sort: any = { createdAt: -1 }
  if (q.sort) {
    const [field, dir] = q.sort.split(':')
    if (field) sort = { [field]: dir === 'asc' ? 1 : -1 }
  }

  const page = q.page
  const limit = q.limit
  const skip = (page - 1) * limit

  const [items, total] = await Promise.all([
    Channel.find(filter).sort(sort).skip(skip).limit(limit),
    Channel.countDocuments(filter),
  ])

  res.json({ total, page, limit, items })
})

const createBody = z.object({
  name: z.string().min(2),
  platform: z.enum(['YouTube','TikTok','Instagram','Twitter','Twitch','Telegram']),
  handle: z.string().min(2),
  subscribers: z.number().int().nonnegative(),
  askingPrice: z.number().nonnegative(),
  niche: z.string().optional(),
  verification: z.boolean().optional(),
  media: z.object({ avatar: z.string().url().optional(), banner: z.string().url().optional() }).optional(),
  growthRate: z.number().optional(),
})

// POST /v1/channels
router.post('/', authGuard, roleGuard('seller','admin'), async (req: Request, res: Response) => {
  const body = createBody.parse(req.body)
  const doc = await Channel.create({ ...body, sellerId: (req as any).user.sub })
  res.status(201).json({ channel: doc })
})

// GET /v1/channels/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const doc = await Channel.findById(id)
  if (!doc) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Channel not found' } })
  res.json(doc)
})
