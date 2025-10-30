import { Router } from 'express'
import { router as auth } from './modules/auth'
import { router as channels } from './modules/channels'

export const router = Router()

router.use('/auth', auth)
router.use('/channels', channels)
