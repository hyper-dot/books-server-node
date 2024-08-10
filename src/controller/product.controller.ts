import { Request, Response } from 'express';
import { productSchema } from '../schemas/product.schema';
// import { v4 } from 'uuid';

export async function addProduct(req: Request, res: Response) {
  const body = req.body;

  /*   TODO:
   * This is throwing error due to not having qty
   * Please check the database table and modify frontend
   * accordingly. I am sleeping
   * 2024-08-09 23:48
   *   */
  const result = productSchema.safeParse(body);
  // const batch_no = v4();
  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    return res.status(500).json({ message: errors });
  }
  console.log(body);

  // await ProductRepo.save({ ...body, batch_no })

  return res.json({ message: 'Product added successfully' });
}
