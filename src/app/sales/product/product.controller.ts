import { asyncWrapper } from '../../../utils/wrapper';
import { ProductService } from './product.service';

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  addnewProduct = asyncWrapper(async (req, res) => {
    await this.service.addNewProduct(req.body);
    return res.json({ message: 'Product created successfully' });
  });
}
