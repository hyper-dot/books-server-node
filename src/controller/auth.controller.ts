import { Request, Response } from 'express';
import { otpSchema, userSchema } from '../schemas/user.schema';
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} from '../utils/exceptions';
import { OTPRepo, UserRepository } from '../../repositories';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { getUserData } from '../helpers/oauth.helper';

import { getAccessToken, getRefreshToken } from '../helpers/tokens.helper';
import { sendOtp } from '../helpers/email.helpers';

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const user = req.body;
  const parsedData = userSchema.safeParse(user);

  // Validate data
  if (!parsedData.success) {
    const error = parsedData.error.errors.map((e) => e.message);
    throw new BadRequestError(error);
  }

  const {
    data: { email, password, name },
  } = parsedData;

  // Check existing users
  const existingUser = await UserRepository.findOneBy({ email });
  if (existingUser) {
    throw new BadRequestError('User already exists.');
  }

  // Hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password + salt, salt);

  // Generate token and refreshToken
  const refreshToken = getRefreshToken({ email });
  const result = await UserRepository.save({
    name,
    hash,
    salt,
    email,
    verified: false,
    refreshToken,
  });

  const newOtp = OTPRepo.create({ user: result, otp: '123456' });
  await OTPRepo.save(newOtp);
  await sendOtp({ name, email, otp: 123456 });

  return res.status(200).json({
    message: 'User created successfully !!',
  });
};

// Get all userSchema
export const getAllUsers = async (_: Request, res: Response) => {
  const users = await UserRepository.find();
  return res.json(users);
};

// Get all userSchema
export const verifyOTP = async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = otpSchema.safeParse(body);
  console.log(body);

  if (!parsedData.success) throw new BadRequestError('Invalid data.');

  const { email, otp } = parsedData.data;
  const user = await UserRepository.findOneBy({ email });

  if (!user) throw new BadRequestError('User not found.');

  const dbOtp = await OTPRepo.findOneBy({ user });
  if (!dbOtp) throw new BadRequestError('OTP not found.');
  if (otp !== dbOtp.otp) throw new BadRequestError('Invalid OTP.');

  // Delete OTP
  await OTPRepo.delete(dbOtp);

  // VERIFY USER
  user.verified = true;
  await UserRepository.save(user);

  return res.json({ message: 'OTP verifed.' });
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserRepository.findOneBy({ email });

  if (!user) throw new UnauthorizedError('Invalid email or password.');

  if (!(await user.validatePassword(password)))
    throw new UnauthorizedError('Invalid email or password.');

  if (!user.verified) throw new ForbiddenError('Please verify OTP first.');

  const payload = { id: user.id, email: user.email, picture: user.picture };
  const accessToken = getAccessToken(payload);

  return res.json({ user, accessToken });
};

// REFRESH TOKEN
export const refreshUserToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new BadRequestError('No refreshtoken provided !!');

  const user = await UserRepository.findOneBy({ refreshToken });
  if (!user) throw new UnauthorizedError('Invalid credentials !!');

  const newAccessToken = getAccessToken({ id: user.id });

  return res.json({
    user,
    accessToken: newAccessToken,
  });
};

// OAUTH POST
export const googleOauthPost = async (req: Request, res: Response) => {
  const oauthClient = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

  const authorizeUrl = oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid ',
    // prompt: "consent",
  });

  return res.json({ url: authorizeUrl });
};

// OAUTH GET
export const googleOauthGet = async (req: Request, res: Response) => {
  const { code } = req.query;

  const oauthClient = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

  const oauthRes = await oauthClient.getToken(code as string);
  await oauthClient.setCredentials(oauthRes.tokens);
  const user = oauthClient.credentials;

  // EXTRACT NECESSARY INFO FROM GOOGLE
  const { sub, name, picture, email } = await getUserData(user.access_token!);

  // Find user with that google id and if not user create a user
  const existingUser = await UserRepository.findOneBy({ googleId: sub, email });

  // Encrypt data and return
  if (existingUser) {
    const accessToken = getAccessToken({
      id: existingUser.id,
      name: existingUser.name,
      picture: existingUser.picture,
    });
    const refreshToken = getRefreshToken({
      id: existingUser.id,
      name: existingUser.name,
      picture: existingUser.picture,
    });

    return res.json({
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        picture: existingUser.picture,
      },
      accessToken,
      refreshToken,
    });
  }

  // Create new user & Encrypt data and return
  const newUser = await UserRepository.save({
    name,
    picture,
    email,
    googleId: sub,
  });

  const accessToken = getAccessToken(newUser);
  const refreshToken = getRefreshToken(newUser);

  return res.json({ user: newUser, accessToken, refreshToken });
};
