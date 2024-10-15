import { Router } from 'express';
import CustomerController from './customer.controller';

export class CustomerRoute {
  router: Router;
  controller: CustomerController;
  constructor() {
    this.router = Router();
    this.controller = new CustomerController();
    this.mountRoutes();
  }
  mountRoutes() {
    this.router.post('/', this.controller.addNewCustomer);
  }
}

const customerRoutes = new CustomerRoute().router;
export default customerRoutes;
