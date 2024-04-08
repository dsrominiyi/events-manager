import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { EVENT_MODEL } from '~/config/providerTokens';
import EntityModel from '~/lib/EntityModel';
import { baseSchemaFields, ensureObjectId } from '~/lib/db';
import {
  CreateEventResponse,
  Event,
  EventInput,
  EventListItem,
  EventUpdate,
  FullEventItem,
} from '~/types/events';

import { TicketService } from '../tickets/ticket.service';

@Injectable()
export class EventService {
  public constructor(
    @Inject(EVENT_MODEL)
    private model: EntityModel<Event>,
    private ticketService: TicketService,
  ) {}

  public async getList(): Promise<EventListItem[]> {
    const events = await this.model.find();

    const eventSoldOutStatusMap = await this.ticketService.getEventListSoldOutStatus(
      events.map(({ _id }) => _id),
    );

    const eventListItems: EventListItem[] = events.map(({ ...event }) => ({
      ...event,
      isSoldOut: eventSoldOutStatusMap[event._id.toString()],
    }));

    return eventListItems;
  }

  public async getFullEvent(id: string): Promise<FullEventItem> {
    const event = await this.model.findOne({ _id: ensureObjectId(id) });

    if (!event) {
      throw new HttpException(`Event ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const tickets = await this.ticketService.getListForEvent(event._id);

    return { ...event, tickets };
  }

  public async create({ tickets, ...eventFields }: EventInput): Promise<CreateEventResponse> {
    const { insertedId: _id } = await this.model.insertOne(eventFields);

    await this.ticketService.createListForEvent(_id, tickets);

    return { _id };
  }

  public async update(
    id: string,
    { modifiedTickets, newTickets, deletedTicketIds, ...eventFields }: EventUpdate,
  ): Promise<Event> {
    await this.ticketService.updateList(modifiedTickets);
    await this.ticketService.createListForEvent(id, newTickets);
    await this.ticketService.deleteList(deletedTicketIds);

    return this.model.updateOne({ _id: ensureObjectId(id) }, baseSchemaFields(eventFields));
  }

  public async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: ensureObjectId(id) });
  }
}
