import { mocked } from 'jest-mock';

import { EventController } from './events.controller';
import { EventService } from './events.service';

jest.mock('./events.service');

const eventId = '507f1f77bcf86cd799439011';
const eventInput: any = { mockEvent: true };
const serviceResult: any = { mockResult: true };

const service = mocked(new EventService(<any>{}, <any>{}));

const controller = new EventController(<any>service);

describe('EventController', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    service.getList.mockResolvedValue(serviceResult);
    service.getFullEvent.mockResolvedValue(serviceResult);
    service.create.mockResolvedValue(serviceResult);
    service.update.mockResolvedValue(serviceResult);
  });

  describe('getList', () => {
    it('retrieves all existing events', async () => {
      await controller.getList();

      expect(service.getList).toHaveBeenCalled();
    });

    it('returns the result', async () => {
      const result = await controller.getList();

      expect(result).toBe(serviceResult);
    });
  });

  describe('getFullEvent', () => {
    it('retrieves the specified event', async () => {
      await controller.getFullEvent(eventId);

      expect(service.getFullEvent).toHaveBeenCalledWith(eventId);
    });

    it('returns the result', async () => {
      const result = await controller.getFullEvent(eventId);

      expect(result).toBe(serviceResult);
    });
  });

  describe('create', () => {
    it('creates the event', async () => {
      await controller.create(eventInput);

      expect(service.create).toHaveBeenCalledWith(eventInput);
    });

    it('returns the result', async () => {
      const result = await controller.create(eventInput);

      expect(result).toBe(serviceResult);
    });
  });

  describe('update', () => {
    it('updates the specified event', async () => {
      await controller.update(eventId, eventInput);

      expect(service.update).toHaveBeenCalledWith(eventId, eventInput);
    });

    it('returns the result', async () => {
      const result = await controller.update(eventId, eventInput);

      expect(result).toBe(serviceResult);
    });
  });

  describe('delete', () => {
    it('deletes the specified event', async () => {
      await controller.delete(eventId);

      expect(service.delete).toHaveBeenCalledWith(eventId);
    });
  });
});
