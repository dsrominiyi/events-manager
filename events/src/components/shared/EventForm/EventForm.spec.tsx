import { EventInput } from '@api/types/events';
import { TicketType } from '@common/types/tickets';
import { fireEvent, render, screen, within } from '@testing-library/react';
import moment from 'moment';
import { AriaRole } from 'react';

import { AppProviders } from '~/components/providers/AppProviders';
import { currencyFormatter } from '~/config/locale';
import { titleCase } from '~/utils/string';

import { EventForm } from './EventForm';

const event: EventInput = {
  name: 'Big Festival',
  description: 'Best festival ever',
  date: moment().add(1, 'month').toDate(),
  tickets: [
    {
      name: 'Early Release',
      type: TicketType.Adult,
      price: 49.99,
      bookingFee: 5.99,
      inStock: false,
    },
    {
      name: 'Final Release',
      type: TicketType.Adult,
      price: 69.99,
      bookingFee: 5.99,
      inStock: true,
    },
  ],
};

const onSubmit = jest.fn();

const getField = (name: string, role: AriaRole = 'textbox') =>
  screen.getByRole<HTMLInputElement>(role, { name });

const updateField = (name: string, value: string, role: AriaRole = 'textbox') =>
  fireEvent.change(getField(name, role), { target: { value } });

const submitForm = () => fireEvent.click(screen.getByText('Create event'));

const addTicket = () => fireEvent.click(screen.getByText('Add ticket'));

const confirmTicket = () => fireEvent.click(screen.getByRole('button', { name: 'Confirm ticket' }));

const editTicket = (index: number) =>
  fireEvent.click(screen.getAllByRole('button', { name: 'Edit ticket' })[index]);

const deleteTicket = (index: number) =>
  fireEvent.click(screen.getAllByRole('button', { name: 'Delete ticket' })[index]);

describe('EventForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('new event', () => {
    beforeEach(() => {
      render(
        <AppProviders>
          <EventForm onSubmit={onSubmit} />
        </AppProviders>,
      );
    });

    it('saves the event when the user fills and submits the form', () => {
      const name = 'Test event';
      const description = 'Test description';
      const date = moment().add(1, 'week').toDate();

      updateField('Name', name);
      updateField('Description', description);
      updateField('Date', date.toISOString());
      submitForm();

      expect(onSubmit).toHaveBeenCalledWith({
        name,
        description,
        date,
        tickets: [],
      });
    });

    it('allows the user to add a ticket on clicking the add ticket button and submitting details', () => {
      const name = 'Test event';
      const ticketName = 'Test ticket';
      const type = TicketType.Adult;
      const price = '19.99';
      const bookingFee = '4.99';

      updateField('Name', name);
      addTicket();
      updateField('Ticket name', ticketName);
      updateField('Type', type, 'combobox');
      updateField('Price (£)', price, 'spinbutton');
      updateField('Booking fee (£)', bookingFee, 'spinbutton');
      confirmTicket();
      submitForm();

      expect(onSubmit).toHaveBeenCalledWith({
        name,
        description: '',
        date: expect.any(Date),
        tickets: [
          {
            name: ticketName,
            type,
            price: +price,
            bookingFee: +bookingFee,
            inStock: false,
          },
        ],
      });
    });

    it('prevents submission if the name has less than 3 characters', () => {
      submitForm();

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('existing event', () => {
    beforeEach(() => {
      render(
        <AppProviders>
          <EventForm currentEvent={event} onSubmit={onSubmit} />
        </AppProviders>,
      );
    });

    it('populates the fields with the event data', () => {
      expect(getField('Name').value).toBe(event.name);
      expect(getField('Description').value).toBe(event.description);
      expect(getField('Date').value).toBe(moment(event.date).format('DD/MM/Y HH:mm'));

      screen.getAllByTestId('ticket-details').forEach((ticketElement, index) => {
        const container = within(ticketElement);
        const expectedStrings = [
          event.tickets[index].name,
          `Type: ${titleCase(event.tickets[index].type)}`,
          `Price: ${currencyFormatter.format(event.tickets[index].price)}`,
          `Booking fee: ${currencyFormatter.format(event.tickets[index].bookingFee)}`,
        ];

        expectedStrings.forEach((value) => expect(container.getByText(value)).toBeInTheDocument());
      });
    });

    it('saves the changes when the user updates and submits the form', () => {
      const name = 'New name';
      const newTicketName = 'Family ticket';
      const type = TicketType.Family;
      const price = '19.99';
      const bookingFee = '4.99';
      const updatedTicketName = 'Updated ticket';

      updateField('Name', name);
      addTicket();
      updateField('Ticket name', newTicketName);
      updateField('Type', type, 'combobox');
      updateField('Price (£)', price, 'spinbutton');
      updateField('Booking fee (£)', bookingFee, 'spinbutton');
      confirmTicket();

      deleteTicket(0);
      editTicket(0);
      updateField('Ticket name', updatedTicketName);
      confirmTicket();

      submitForm();

      expect(onSubmit).toHaveBeenCalledWith({
        ...event,
        name,
        tickets: [
          {
            ...event.tickets[1],
            name: updatedTicketName,
          },
          {
            name: newTicketName,
            type,
            price: +price,
            bookingFee: +bookingFee,
            inStock: false,
          },
        ],
      });
    });
  });
});
