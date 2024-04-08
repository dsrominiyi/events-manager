import { ObjectId } from 'mongodb';
import { z } from 'nestjs-zod/z';

import { EventInputSchema, EventUpdateSchema } from '../schema/events.schema';

import { Recorded } from './database';
import { Ticket } from './tickets';

export type EventInput = z.infer<typeof EventInputSchema>;

export type EventUpdate = z.infer<typeof EventUpdateSchema>;

export type Event = Omit<Recorded<EventInput>, 'tickets'>;

export interface CreateEventResponse {
  _id: ObjectId;
}

export type CreateEventResponseJson = JsonType<CreateEventResponse>;

export interface EventListItem extends Event {
  isSoldOut: boolean;
}

export type EventListItemJson = JsonType<EventListItem>;

export interface FullEventItem extends Event {
  tickets: Ticket[];
}

export type FullEventItemJson = JsonType<FullEventItem>;
