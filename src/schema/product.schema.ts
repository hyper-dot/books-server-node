import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1),
  stock: z.coerce.number().min(0),
  reorderLevel: z.coerce.number().min(0),
  salesPrice: z.coerce.number().min(0),
  costPrice: z.coerce.number().min(0),
});

export type TProductSchema = z.infer<typeof productSchema>;
