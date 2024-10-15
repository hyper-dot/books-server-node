import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(3).max(255),
  phone: z.string().min(3).max(255),
  address: z.string().min(3).max(255),
  email: z.string().email().max(255),
  regNum: z.string().optional(),
  dueAmt: z.number().optional(),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;
