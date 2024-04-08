import { FullEventItemJson } from '@api/types/events';
import { TicketType } from '@common/types/tickets';
import { render } from '@testing-library/react';
import { mocked } from 'jest-mock';
import moment from 'moment';

import { AppProviders } from '~/components/providers/AppProviders';
import { EventForm } from '~/components/shared/EventForm';

import { EventEditPage } from './EventEditPage';

jest.mock('~/components/shared/EventForm');

const now = new Date();

const dateFields = { created: now.toISOString(), modified: now.toISOString() };

const event: FullEventItemJson = {
  _id: 'event-id',
  name: 'Big Festival',
  description: 'Best festival ever',
  date: moment().add(1, 'month').toString(),
  tickets: [
    {
      _id: '0',
      eventId: 'event-id',
      name: 'Early Release',
      type: TicketType.Adult,
      price: 49.99,
      bookingFee: 5.99,
      inStock: false,
      ...dateFields,
    },
    {
      _id: '1',
      eventId: 'event-id',
      name: 'Final Release',
      type: TicketType.Adult,
      price: 69.99,
      bookingFee: 5.99,
      inStock: true,
      ...dateFields,
    },
  ],
  ...dateFields,
};

const newTicket = {
  name: 'Final Final Release',
  type: TicketType.Adult,
  price: 89.99,
  bookingFee: 9.99,
  inStock: true,
};

const updateEvent = jest.fn();

describe('EventEditPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <AppProviders>
        <EventEditPage event={event} updateEvent={updateEvent} />
      </AppProviders>,
    );
  });

  it.each([
    {
      update: { ...event, tickets: [] },
      modifiedTickets: [],
      deletedTicketIds: ['0', '1'],
      newTickets: [],
    },
    {
      update: { ...event, tickets: [event.tickets[1]] },
      modifiedTickets: [event.tickets[1]],
      deletedTicketIds: ['0'],
      newTickets: [],
    },
    {
      update: { ...event, tickets: [...event.tickets, newTicket] },
      modifiedTickets: [...event.tickets],
      deletedTicketIds: [],
      newTickets: [newTicket],
    },
  ])(
    'sends the expected update payload on submission',
    async ({ update, modifiedTickets, deletedTicketIds, newTickets }) => {
      const { onSubmit } = mocked(EventForm).mock.calls[0][0];

      await onSubmit(update as any);

      expect(updateEvent).toHaveBeenCalledWith({
        ...update,
        modifiedTickets,
        deletedTicketIds,
        newTickets,
        tickets: undefined,
      });
    },
  );
});
