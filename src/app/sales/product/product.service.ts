import ProductModel from './product.model';
import { productSchema, TProductSchema } from '../../../schema/product.schema';
import { BadRequestError } from '../../../utils/exceptions';

export class ProductService {
  async getAllProducts(user: string) {
    const products = await ProductModel.find({ user });
    const productsWithTotalQty = products.map((product) => {
      const totalQty = product.batches.reduce(
        (sum, batch) => sum + batch.qty,
        0,
      );

      // Return the product object with the additional totalQty field
      return {
        ...product.toObject(), // Convert the product document to a plain JS object
        totalQty,
      };
    });

    return productsWithTotalQty;
  }

  async addNewProduct(payload: TProductSchema, user: string) {
    const { data, success } = productSchema.safeParse(payload);
    if (!success) throw new BadRequestError('Invalid payload format');

    const existingProduct = await ProductModel.findOne({ name: data.name });
    console.log('EXISTING PRODUCT', existingProduct);
    if (existingProduct) throw new BadRequestError('Product exist already');

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
