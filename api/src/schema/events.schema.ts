import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import { TicketInputSchema, TicketUpdateSchema } from './tickets.schema';

const commonFields = {
  name: z.string().min(3),
  date: z.dateString().format('date-time').cast(),
  description: z.string(),
};

export const EventInputSchema = z.object({
  ...commonFields,
  tickets: z.array(TicketInputSchema),
});

export const EventUpdateSchema = z.object({
  ...commonFields,
  _id: z.string(),
  modifiedTickets: z.array(TicketUpdateSchema),
  newTickets: z.array(TicketInputSchema),
  deletedTicketIds: z.array(z.string()),
});

export class EventInputDto extends createZodDto(EventInputSchema) {}

export class EventUpdateDto extends createZodDto(EventUpdateSchema) {}
