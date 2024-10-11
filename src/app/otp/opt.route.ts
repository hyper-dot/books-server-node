import { Router, Request, Response } from 'express';
import { asyncWrapper } from '../../utils/wrapper';
import OTPService from './otp.service';
import UserModel from '../user/user.model'; // Import your User model
import { BadRequestError } from '../../utils/exceptions';

class OtpRoutes {
  router: Router;
  private otpService: OTPService;

  constructor() {
    this.router = Router();
    this.otpService = new OTPService();
    this.setRoutes();
  }

  private setRoutes() {
    // Route for verifying OTP
    this.router.post(
      '/verify',
      asyncWrapper(async (req: Request, res: Response) => {
        const { email, otp } = req.body; // Destructure email and otp from the request body

        // Check for missing email or OTP
        if (!email || !otp) {
          throw new BadRequestError('Email and OTP are required.');
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new BadRequestError('Invalid email address.');
        }

        // Verify the OTP against the user's ID
        const isVerified = await this.otpService.verifyOTP(
          user._id.toString(),
          otp,
        );

        if (isVerified) {
          return res
            .status(200)
            .json({ message: 'OTP verified successfully.' });
        } else {
          throw new BadRequestError('Invalid or expired OTP.');
        }
      }),
    );
  }
}

export const otpRoutes = new OtpRoutes().router;
