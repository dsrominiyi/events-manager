import { ObjectId } from 'mongodb';

import { TicketType } from '~/schema/tickets.schema';
import { Ticket, TicketInput } from '~/types/tickets';

export const buildTicketInput = (name = 'Test Ticket'): TicketInput => ({
  name,
  type: TicketType.Adult,
  price: 49.99,
  bookingFee: 4.99,
  inStock: true,
});

export const buildTicketInsert = (
  eventId: ObjectId,
  name = 'Test Ticket',
): Omit<Ticket, '_id'> => ({
  ...buildTicketInput(name),
  eventId,
  created: new Date(),
  modified: new Date(),
});

export const buildTicket = (name = 'Test Ticket', eventId: ObjectId = new ObjectId()): Ticket => ({
  _id: new ObjectId(),
  ...buildTicketInsert(eventId, name),
});
