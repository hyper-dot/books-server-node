import { UnauthorizedError } from '../utils/exceptions'
import { NextFunction, Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization').split(' ')[1]
  // Check if token is present
  if (!token) {
    throw new UnauthorizedError()
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    throw new UnauthorizedError()
  }
}
