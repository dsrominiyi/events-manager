import { z } from 'nestjs-zod/z';

export enum TicketType {
  Adult = 'ADULT',
  Child = 'CHILD',
  Family = 'FAMILY',
}

const commonFields = {
  name: z.string().min(3),
  type: z.nativeEnum(TicketType),
  price: z.number(),
  bookingFee: z.number(),
  inStock: z.boolean(),
};

export const TicketInputSchema = z.object(commonFields);

export const TicketUpdateSchema = z.object({
  _id: z.string(),
  eventId: z.string(),
  ...commonFields,
});
