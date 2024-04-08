import { ObjectId } from 'mongodb';
import { z } from 'nestjs-zod/z';

import { TicketInputSchema, TicketUpdateSchema } from '../schema/tickets.schema';

import { Recorded } from './database';

export type TicketInput = z.infer<typeof TicketInputSchema>;

export type TicketUpdate = z.infer<typeof TicketUpdateSchema>;

export interface Ticket extends Recorded<TicketInput> {
  eventId: ObjectId;
}

export type TicketJson = JsonType<Ticket>;
