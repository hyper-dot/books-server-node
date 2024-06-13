import { Router } from 'express'
import { asyncWrapper } from '../utils/wrapper'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.get(
  '/',
  authMiddleware,
  asyncWrapper((req, res) => {
    return res.json({ message: 'ok' })
  }),
)

export { router as userRoutes }
