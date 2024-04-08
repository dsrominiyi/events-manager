import { HttpException } from '@nestjs/common';
import { mocked } from 'jest-mock';
import { omit } from 'lodash';
import { ObjectId } from 'mongodb';

import EntityModel from '~/lib/EntityModel';
import { Event } from '~/types/events';
import { buildEvent } from '~test/__fixtures__/events';

import { TicketService } from '../tickets/ticket.service';

import { EventService } from './events.service';

jest.mock('~/lib/EntityModel');
jest.mock('../tickets/ticket.service');

const events = [buildEvent('Event 1'), buildEvent('Event 2'), buildEvent('Event 3')];
const eventIds = events.map(({ _id }) => _id);
const eventId = eventIds[0].toString();
const eventSoldOutStatusMap = {
  [eventIds[0].toString()]: false,
  [eventIds[1].toString()]: false,
  [eventIds[2].toString()]: true,
};
const tickets: any = [{ mockTicket: true }];
const eventInput: any = { mockInput: true, tickets };
const eventUpdate: any = {
  mockUpdate: true,
  modifiedTickets: [{ mockModifiedTicket: true }],
  newTickets: [{ mockNewTicket: true }],
  deletedTicketIds: [new ObjectId().toString()],
};
const updateResult: any = { mockResult: true };

const model = mocked(new EntityModel<Event>(<any>{}, 'test', <any>{}));
const ticketService = mocked(new TicketService(<any>{}));

const service = new EventService(model, ticketService);

describe('EventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    model.find.mockResolvedValue(events);
    model.findOne.mockResolvedValue(events[0]);
    model.insertOne.mockResolvedValue(<any>{ insertedId: events[0]._id });
    model.updateOne.mockResolvedValue(updateResult);
    ticketService.getEventListSoldOutStatus.mockResolvedValue(eventSoldOutStatusMap);
    ticketService.getListForEvent.mockResolvedValue(tickets);
  });

  describe('getList', () => {
    it('retrieves all existing events', async () => {
      await service.getList();

      expect(model.find).toHaveBeenCalled();
    });

    it('retrieves the sold out status of the events', async () => {
      await service.getList();

      expect(ticketService.getEventListSoldOutStatus).toHaveBeenCalledWith(eventIds);
    });

    it('merges the sold out statuses and returns the result', async () => {
      const result = await service.getList();

      expect(result).toEqual(
        events.map((event) => ({
          ...event,
          isSoldOut: eventSoldOutStatusMap[event._id.toString()],
        })),
      );
    });
  });

  describe('getFullEvent', () => {
    it('retrieves the specified event', async () => {
      await service.getFullEvent(eventId);

      expect(model.findOne).toHaveBeenCalledWith({ _id: new ObjectId(eventId) });
    });

    it('retrieves the tickets for the event', async () => {
      await service.getFullEvent(eventId);

      expect(ticketService.getListForEvent).toHaveBeenCalledWith(new ObjectId(eventId));
    });

    it('returns the merged result', async () => {
      const result = await service.getFullEvent(eventId);

      expect(result).toEqual({ ...events[0], tickets });
    });

    it('throws a 404 error if no matching event is found', async () => {
      let error: HttpException | undefined;
      model.findOne.mockResolvedValue(null);

      try {
        await service.getFullEvent(eventId);
      } catch (err) {
        error = <HttpException>err;
      }

      expect(error?.getStatus()).toBe(404);
    });
  });

  describe('create', () => {
    it('creates the event', async () => {
      await service.create(eventInput);

      expect(model.insertOne).toHaveBeenCalledWith(omit(eventInput, 'tickets'));
    });

    it('creates the tickets', async () => {
      await service.create(eventInput);

      expect(ticketService.createListForEvent).toHaveBeenCalledWith(events[0]._id, tickets);
    });

    it('returns the result', async () => {
      const result = await service.create(eventInput);

      expect(result).toEqual({ _id: events[0]._id });
    });
  });

  describe('update', () => {
    it('updates the modified tickets', async () => {
      await service.update(eventId, eventUpdate);

      expect(ticketService.updateList).toHaveBeenCalledWith(eventUpdate.modifiedTickets);
    });

    it('creates the new tickets', async () => {
      await service.update(eventId, eventUpdate);

      expect(ticketService.createListForEvent).toHaveBeenCalledWith(
        eventId,
        eventUpdate.newTickets,
      );
    });

    it('deletes the tickets marked for deletion', async () => {
      await service.update(eventId, eventUpdate);

      expect(ticketService.deleteList).toHaveBeenCalledWith(eventUpdate.deletedTicketIds);
    });

    it('updates the specified event', async () => {
      await service.update(eventId, eventUpdate);

      expect(model.updateOne).toHaveBeenCalledWith(
        { _id: new ObjectId(eventId) },
        omit(eventUpdate, ['modifiedTickets', 'newTickets', 'deletedTicketIds']),
      );
    });
  });

  describe('delete', () => {
    it('deletes the specified event', async () => {
      await service.delete(eventId);

      expect(model.deleteOne).toHaveBeenCalledWith({ _id: new ObjectId(eventId) });
    });
  });
});
