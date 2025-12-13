import { z } from 'zod';

export const orderSchema = z.object({
  side: z.enum(['BUY', 'SELL']),
  type: z.enum(['MARKET', 'LIMIT']),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive').optional(),
}).refine(
  (data) => data.type === 'MARKET' || data.price !== undefined,
  {
    message: 'Price is required for LIMIT orders',
    path: ['price']
  }
);

export type OrderFormData = z.infer<typeof orderSchema>;
