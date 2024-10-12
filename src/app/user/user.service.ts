import { BadRequestError } from '../../utils/exceptions';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';
import OTPService from '../otp/otp.service';
import UserModel from './user.model';
import { TUserSchema, userSchema } from './user.schema';

export default class UserService {
  private authService: AuthService;
  private emailService: EmailService;
  private OTPService: OTPService;

  constructor() {
    this.authService = new AuthService();
    this.emailService = new EmailService();
    this.OTPService = new OTPService();
  }

  async addUser(payload: TUserSchema) {
    const { success, data } = userSchema.safeParse(payload);
    if (!success) throw new BadRequestError();

    // Check if user with same email exist
    const oldUser = await UserModel.findOne({ email: data.email });
    if (oldUser) throw new BadRequestError('User already exists');

    const newUser = new UserModel(data);
    // Add refresh token to user
    newUser.refreshToken = this.authService.generateRefreshToken({
      id: newUser._id.toString(),
      email: data.email,
      role: newUser.role,
    });

    // Add hashed password to the user
    newUser.hash = await this.authService.hashPassword(data.password);

    const otp = await this.OTPService.generateOTP(newUser._id.toString());
    await this.emailService.sendEmail(
      data.email,
      'OTP code for Ez Books',
      `Your OTP code for ez books is ${otp}`,
    );

    await newUser.save();
    return { message: 'User created successfully' };
  }
}
