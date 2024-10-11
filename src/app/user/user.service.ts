import { BadRequestError } from '../../utils/exceptions';
import { AuthService } from '../auth/auth.service';
import UserModel from './user.model';
import { TUserSchema, userSchema } from './user.schema';

export default class UserService {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
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
    await newUser.save();

    return { message: 'User created successfully' };
  }
}
