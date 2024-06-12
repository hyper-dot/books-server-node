import * as jwt from 'jsonwebtoken'

export const getAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '10s',
  })
}

export const getRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '10s',
  })
}
