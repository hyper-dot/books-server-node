import { Request, Response } from 'express'
import { userSchema } from '../schemas/user.schema'
import { BadRequestError, UnauthorizedError } from '../utils/exceptions'
import { UserRepository } from '../../repositories'
import * as bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library'
import { getUserData } from '../helpers/oauth.helper'

import { getAccessToken, getRefreshToken } from '../helpers/tokens.helper'
import { sendOtp } from '../helpers/email.helpers'

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const user = req.body
  const parsedData = userSchema.safeParse(user)

  // Validate data
  if (!parsedData.success) {
    const error = parsedData.error.errors.map((e) => e.message)
    throw new BadRequestError(error)
  }

  const {
    data: { email, password, name },
  } = parsedData

  // Check existing users
  const existingUser = await UserRepository.findOneBy({ email })
  if (existingUser) {
    throw new BadRequestError('User already exists.')
  }

  // Hash the password
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password + salt, salt)

  // Generate token and refreshToken
  const refreshToken = getRefreshToken({ email })

  const savedUser = await UserRepository.save({
    name,
    hash,
    salt,
    email,
    verified: false,
    refreshToken,
  })

  const accessToken = getAccessToken({ name, email, id: savedUser.id })

  return res.status(200).json({
    message: 'User created successfully !!',
    accessToken,
    refreshToken,
  })
}

// Get all userSchema
export const getAllUsers = async (_: Request, res: Response) => {
  const users = await UserRepository.find()
  return res.json(users)
}

// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await UserRepository.findOneBy({ email })

  if (!user) throw new UnauthorizedError('Invalid email or password.')

  if (!(await user.validatePassword(password)))
    throw new UnauthorizedError('Invalid email or password.')

  const payload = { id: user.id, email: user.email, picture: user.picture }
  const accessToken = getAccessToken(payload)
  const refreshToken = getRefreshToken(payload)

  return res.json({ user, accessToken, refreshToken })
}

// REFRESH TOKEN
export const refreshUserToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body
  console.log('RECEIVED BODY', req.body)

  if (!refreshToken) throw new BadRequestError()

  const newRefreshToken = getRefreshToken({})
  const newAccessToken = getAccessToken({})

  return res.json({
    refreshToken: newRefreshToken,
    accessToken: newAccessToken,
  })
}

// OAUTH POST
export const googleOauthPost = async (req: Request, res: Response) => {
  const oauthClient = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  )

  const authorizeUrl = oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid ',
    // prompt: "consent",
  })

  return res.json({ url: authorizeUrl })
}

// OAUTH GET
export const googleOauthGet = async (req: Request, res: Response) => {
  const { code } = req.query

  const oauthClient = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  )

  const oauthRes = await oauthClient.getToken(code as string)
  await oauthClient.setCredentials(oauthRes.tokens)
  const user = oauthClient.credentials

  // EXTRACT NECESSARY INFO FROM GOOGLE
  const { sub, name, picture, email } = await getUserData(user.access_token!)

  // Find user with that google id and if not user create a user
  const existingUser = await UserRepository.findOneBy({ googleId: sub, email })

  // Encrypt data and return
  if (existingUser) {
    const accessToken = getAccessToken({
      id: existingUser.id,
      name: existingUser.name,
      picture: existingUser.picture,
    })
    const refreshToken = getRefreshToken({
      id: existingUser.id,
      name: existingUser.name,
      picture: existingUser.picture,
    })

    return res.json({
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        picture: existingUser.picture,
      },
      accessToken,
      refreshToken,
    })
  }

  // Create new user & Encrypt data and return
  const newUser = await UserRepository.save({
    name,
    picture,
    email,
    googleId: sub,
  })

  const accessToken = getAccessToken(newUser)
  const refreshToken = getRefreshToken(newUser)

  return res.json({ user: newUser, accessToken, refreshToken })
}
