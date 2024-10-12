import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenError, UnauthorizedError } from './utils/exceptions';
import UserModel from './app/user/user.model';

export const isAuthencticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new UnauthorizedError('Token is required');
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    req.params.userId = (decoded as any).userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// export const isAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = req.params.userId;
//     const user = await UserModel.findById(userId);
//     if (user?.isAdmin) {
//       next();
//     } else {
//       throw new ForbiddenError('Only Admins are allowed');
//     }
//   } catch (err: any) {
//     console.error(err);
//     res.status(403).json({ message: err.message });
//   }
// };
