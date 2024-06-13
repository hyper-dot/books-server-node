import { Router } from 'express'
import { asyncWrapper } from '../utils/wrapper'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

/* TODO:
 * 1. First I have to create a supplier
 * 2. Scond I have to create a purchase
 * 3. I need to implement authmiddleware since there is user involved
 * */

router.post(
  '/',
  asyncWrapper((req, res) => {
    const body = req.body
    return res.json(body)
  }),
)

export { router as supplierRoute }
