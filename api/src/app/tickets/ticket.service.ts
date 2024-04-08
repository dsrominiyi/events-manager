import { Inject, Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { ObjectId } from 'mongodb';

import { TICKET_MODEL } from '~/config/providerTokens';
import EntityModel from '~/lib/EntityModel';
import { ensureObjectId, sanitiseItemUpdates } from '~/lib/db';
import { BaseSchema, IdType } from '~/types/database';
import { Ticket, TicketInput, TicketUpdate } from '~/types/tickets';

@Injectable()
export class TicketService {
  public constructor(
    @Inject(TICKET_MODEL)
    private model: EntityModel<Ticket>,
  ) {}

  /** Omit to avoid potentially attempting to update records with a string value */
  private omitEventIds(modifiedTickets: TicketUpdate[]) {
    return modifiedTickets.map((ticket) => omit(ticket, ['eventId']));
  }

  public async getListForEvent(eventIdArg: IdType): Promise<Ticket[]> {
    const eventId = ensureObjectId(eventIdArg);

    return this.model.find({ eventId });
  }

  public async createListForEvent(eventIdArg: IdType, tickets: TicketInput[]): Promise<void> {
    if (!tickets.length) {
      return;
    }
    const eventId = ensureObjectId(eventIdArg);
    const newTickets: BaseSchema<Ticket>[] = tickets.map((ticket) => ({ ...ticket, eventId }));

    await this.model.insertMany(newTickets);
  }

  public async updateList(modifiedTickets: TicketUpdate[]): Promise<void> {
    if (!modifiedTickets.length) {
      return;
    }
    const dbUpdates = sanitiseItemUpdates(this.omitEventIds(modifiedTickets));

    await this.model.updateList(dbUpdates);
  }

  public async deleteList(ids: IdType[]): Promise<void> {
    if (!ids.length) {
      return;
    }
    await this.model.deleteMany({ _id: { $in: ids.map(ensureObjectId) } });
  }

  public async getEventListSoldOutStatus(eventIds: IdType[]): Promise<Record<string, boolean>> {
    // Check against in-stock tickets to account for any events with no associated tickets
    const inStockEventIds: ObjectId[] = await this.model.distinct('eventId', {
      eventId: { $in: eventIds.map(ensureObjectId) },
      inStock: true,
    });
    const strInStockEventIds = inStockEventIds.map((eventId) => eventId.toString());

    const eventSoldOutStatusMap = eventIds.reduce(
      (solOutMap, eventId) => {
        const strId = eventId.toString();
        return { ...solOutMap, [strId]: !strInStockEventIds.includes(strId) };
      },
      <Record<string, boolean>>{},
    );

    return eventSoldOutStatusMap;
  }
}
