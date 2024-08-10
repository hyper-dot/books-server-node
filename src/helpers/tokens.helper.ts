import * as jwt from 'jsonwebtoken';
import { User } from '../entity';

type Payload = Partial<Pick<User, 'id' | 'name' | 'email' | 'picture'>>;

export const getAccessToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    algorithm: 'HS256',
    expiresIn: '15m',
  });
};

export const getRefreshToken = (payload: Payload) => {
  console.log(payload);
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
    {
      algorithm: 'HS256',
      expiresIn: '15m',
    },
  );
};
