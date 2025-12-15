import { z } from 'zod';
import { copy } from '../i18n/copy';

export const orderSchema = z.object({
  side: z.enum(['BUY', 'SELL']),
  type: z.enum(['MARKET', 'LIMIT']),
  quantity: z.number().int().positive(copy.validation.quantityPositive()),
  price: z.number().positive(copy.validation.pricePositive()).optional(),
}).refine(
  (data) => data.type === 'MARKET' || data.price !== undefined,
  {
    message: copy.validation.priceRequiredForLimit(),
    path: ['price']
  }
);

export type OrderFormData = z.infer<typeof orderSchema>;
