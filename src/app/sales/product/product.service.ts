import ProductModel from './product.model';
import { productSchema, TProductSchema } from '../../../schema/product.schema';
import { BadRequestError } from '../../../utils/exceptions';
export class ProductService {
  async addNewProduct(payload: TProductSchema) {
    const { data, success } = productSchema.safeParse(payload);
    if (!success) throw new BadRequestError('Invalid payload format');
    const newProduct = new ProductModel(data);
    await newProduct.save();
  }
}
