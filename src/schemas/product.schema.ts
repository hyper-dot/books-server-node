import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(5, { message: 'Product name is too short.' }),
  stock: z.coerce.number().min(0, { message: 'Cannot be less than 0.' }),
  reorder_level: z.coerce.number().min(0, { message: 'Must be more than 0.' }),
  sales_price: z.coerce.number().min(0, { message: 'Cannot be less than 0.' }),
  cost_price: z.coerce.number().min(0, { message: 'Cannot be less than 0.' }),
})

export type TProductSchema = z.infer<typeof productSchema>
