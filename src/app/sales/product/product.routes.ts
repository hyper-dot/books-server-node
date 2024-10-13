import { Router } from 'express';
import { ProductController } from './product.controller';

class ProductRouter {
  public router: Router;

  private controller: ProductController;

  constructor() {
    this.router = Router();
    this.controller = new ProductController();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.get('/', this.controller.getAllProducts);
    this.router.post('/', this.controller.addnewProduct);
  }
}

const productRoutes = new ProductRouter().router;
export default productRoutes;
