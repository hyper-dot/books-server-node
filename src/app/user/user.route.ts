import { Router } from 'express';
import UserController from './user.controller';

class UserRoutes {
  public router: Router;

  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/', this.controller.addUser);
  }
}

const userRoutes = new UserRoutes().router;
export default userRoutes;
