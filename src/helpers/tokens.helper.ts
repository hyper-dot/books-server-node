import * as jwt from 'jsonwebtoken';

export const getAccessToken = (payload: Record<string, string>) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });
};

export const getRefreshToken = (payload: Record<string, string>) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });
};
