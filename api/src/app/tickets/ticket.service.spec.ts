import { mocked } from 'jest-mock';
import { omit } from 'lodash';
import { ObjectId } from 'mongodb';

import EntityModel from '~/lib/EntityModel';
import { baseSchemaFields } from '~/lib/db';
import { Ticket, TicketInput } from '~/types/tickets';
import { buildTicket } from '~test/__fixtures__/tickets';

import { TicketService } from './ticket.service';

jest.mock('~/lib/EntityModel');

const eventId = new ObjectId().toString();
const eventIds = [eventId, new ObjectId().toString(), new ObjectId().toString()];
const tickets = [buildTicket('Ticket 1'), buildTicket('Ticket 2'), buildTicket('Ticket 3')];
const ticketIds = tickets.map(({ _id }) => _id);
const newTickets = <TicketInput[]>tickets.map((ticket) => baseSchemaFields(ticket));
const modifiedTickets = tickets.map(({ _id, eventId: eId, ...ticket }) => ({
  ...ticket,
  _id: _id.toString(),
  eventId: eId.toString(),
}));

const model = mocked(new EntityModel<Ticket>(<any>{}, 'test', <any>{}));

const service = new TicketService(model);

describe('TicketService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    model.find.mockResolvedValue(tickets);
    model.findOne.mockResolvedValue(tickets[0]);
    model.insertOne.mockResolvedValue(<any>{ insertedId: tickets[0]._id });
    model.distinct.mockResolvedValue([eventId]);
  });

  describe('getListForEvent', () => {
    it('retrieves all existing tickets for the specified event', async () => {
      await service.getListForEvent(eventId);

      expect(model.find).toHaveBeenCalledWith({ eventId: new ObjectId(eventId) });
    });

    it('returns the result', async () => {
      const result = await service.getListForEvent(eventId);

      expect(result).toBe(tickets);
    });
  });

  describe('createListForEvent', () => {
    it('adds the eventId to each ticket and creates a record', async () => {
      await service.createListForEvent(eventId, newTickets);

      expect(model.insertMany).toHaveBeenCalledWith(
        newTickets.map((ticket) => ({ ...ticket, eventId: new ObjectId(eventId) })),
      );
    });
  });

  describe('updateList', () => {
    it('sanitises the update items and updates the records', async () => {
      await service.updateList(modifiedTickets);

      expect(model.updateList).toHaveBeenCalledWith(
        modifiedTickets.map((ticket) =>
          omit({ ...ticket, _id: new ObjectId(ticket._id) }, ['created', 'modified', 'eventId']),
        ),
      );
    });
  });

  describe('deleteList', () => {
    it('deletes the specified tickets', async () => {
      await service.deleteList(ticketIds);

      expect(model.deleteMany).toHaveBeenCalledWith({
        _id: { $in: ticketIds },
      });
    });
  });

  describe('getEventListSoldOutStatus', () => {
    it('gets the ids of events with at least one ticket type in stock', async () => {
      await service.getEventListSoldOutStatus(eventIds);

      expect(model.distinct).toHaveBeenCalledWith('eventId', {
        eventId: { $in: eventIds.map((id) => new ObjectId(id)) },
        inStock: true,
      });
    });

    it('builds and returns the sold out status map', async () => {
      const result = await service.getEventListSoldOutStatus(eventIds);

      expect(result).toEqual({
        [eventId]: false,
        [eventIds[1]]: true,
        [eventIds[2]]: true,
      });
    });
  });
});
