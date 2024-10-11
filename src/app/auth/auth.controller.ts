import { asyncWrapper } from '../../utils/wrapper';
import { AuthService } from './auth.service';

export class AuthController {
  private service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  login = asyncWrapper(async (req, res) => {
    const response = await this.service.login(req.body);
    return res.json(response);
  });
}
