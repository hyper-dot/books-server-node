import { Router, Request, Response } from 'express';
import { asyncWrapper } from '../../utils/wrapper';
import OTPService from './otp.service';
import UserModel from '../user/user.model'; // Import your User model
import { BadRequestError } from '../../utils/exceptions';
import OTPModel from './opt.model';
import { EmailService } from '../email/email.service';

class OtpRoutes {
  router: Router;
  private otpService: OTPService;
  private emailService: EmailService;

  constructor() {
    this.router = Router();
    this.otpService = new OTPService();
    this.emailService = new EmailService();
    this.setRoutes();
  }

  private setRoutes() {
    // Route for verifying OTP
    this.router.post(
      '/verify',
      asyncWrapper(async (req: Request, res: Response) => {
        const { email, otp } = req.body; // Destructure email and otp from the request body

        // Check for missing email or OTP
        if (!email || !otp)
          throw new BadRequestError('Email and OTP are required');

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) throw new BadRequestError('Invalid email address');

        // Verify the OTP against the user's ID
        const isVerified = await this.otpService.verifyOTP(
          user._id.toString(),
          otp,
        );

        if (isVerified) {
          user.isVerified = true;
          await user.save();
          return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
          throw new BadRequestError('Invalid or expired OTP');
        }
      }),
    );

    this.router.post(
      '/regenerate',
      asyncWrapper(async (req, res) => {
        const { email } = req.body;
        if (!email) throw new BadRequestError('Email is required');

        const user = await UserModel.findOne({ email });
        if (!user) throw new BadRequestError('Invalid email address');

        const oldOtp = await OTPModel.findOne({ userId: user._id.toString() });
        if (oldOtp)
          throw new BadRequestError(
            'Please wait 2 minutes before sending new otp request',
          );

        const otp = await this.otpService.generateOTP(user._id.toString());
        await this.emailService.sendEmail(
          user.email,
          'OTP code for Ez Books',
          `Your OTP code for ez books is ${otp}`,
        );
        return res.json({ message: 'OTP sent successfully !!' });
      }),
    );
  }
}

export const otpRoutes = new OtpRoutes().router;
