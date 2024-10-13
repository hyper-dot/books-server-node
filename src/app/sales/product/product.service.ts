import ProductModel from './product.model';
import { productSchema, TProductSchema } from '../../../schema/product.schema';
import { BadRequestError } from '../../../utils/exceptions';

export class ProductService {
  async addNewProduct(payload: TProductSchema, user: string) {
    const { data, success } = productSchema.safeParse(payload);
    if (!success) throw new BadRequestError('Invalid payload format');

    const batches = [
      {
        batchNo: 1,
        qty: data.stock,
        salesPrice: data.salesPrice,
        costPrice: data.costPrice,
      },
    ];

    const newProduct = new ProductModel({
      user,
      name: data.name,
      reorderLevel: data.reorderLevel,
      batches,
    });

    await newProduct.save();
  }
}
