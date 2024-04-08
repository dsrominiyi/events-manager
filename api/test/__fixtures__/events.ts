import { ObjectId } from 'mongodb';

import { Event, EventInput } from '~/types/events';
import { TicketInput } from '~/types/tickets';

export const buildEventInput = (name = 'Test Event', tickets: TicketInput[] = []): EventInput => ({
  name,
  description: 'Best event yet',
  date: new Date(),
  tickets,
});

export const buildEventInsert = (name = 'Test Event'): Omit<Event, '_id'> => ({
  name,
  description: 'Best event yet',
  date: new Date(),
  created: new Date(),
  modified: new Date(),
});

export const buildEvent = (name = 'Test Event'): Event => ({
  _id: new ObjectId(),
  ...buildEventInsert(name),
});
