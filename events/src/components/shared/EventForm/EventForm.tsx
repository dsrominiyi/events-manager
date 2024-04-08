import { EventInput } from '@api/types/events';
import { TicketInput } from '@api/types/tickets';
import moment from 'moment';
import { Key, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Button } from '~/components/common/Button';
import { Field, Input } from '~/components/common/Form';
import { useFormState } from '~/hooks/useFormState';

import { FormFields, Tickets } from './EventForm.styled';
import { TicketDetails } from './TicketDetails/TicketDetails';
import { TicketForm } from './TicketForm';

interface Props<TEvent extends EventInput> {
  currentEvent?: TEvent;
  submitLabel?: string;
  onSubmit(eventInput: TEvent): Promise<void | { error: string }>;
}
const minDate = moment().add(1, 'day').toDate();

export const EventForm = <TEvent extends EventInput>({
  currentEvent,
  submitLabel = 'Create event',
  onSubmit,
}: Props<TEvent>) => {
  const {
    data: eventData,
    hasChanges,
    updateField,
  } = useFormState<EventInput>(
    currentEvent || {
      name: '',
      description: '',
      date: minDate,
      tickets: [],
    },
  );

  const [pendingTicketIndex, setPendingTicketIndex] = useState<number>();

  const hasPendingTicket = pendingTicketIndex !== undefined;
  const hasPendingNewTicket = pendingTicketIndex === eventData.tickets.length;
  const canSubmit = hasChanges && eventData.name.length > 3 && !hasPendingTicket;

  const onClickDeleteTicket = (index: number) => {
    updateField('tickets', eventData.tickets.toSpliced(index, 1));
  };

  const onTicketConfirmed = (ticket: TicketInput) => {
    if (!hasPendingTicket) {
      return;
    }
    updateField('tickets', eventData.tickets.toSpliced(pendingTicketIndex, 1, ticket));
    setPendingTicketIndex(undefined);
  };

  const onClickSubmit = () => canSubmit && onSubmit(eventData as TEvent);

  const renderTicketForm = (key?: Key, currentTicket?: TicketInput) => (
    <TicketForm
      key={key}
      currentTicket={currentTicket}
      onCancel={() => setPendingTicketIndex(undefined)}
      onConfirm={onTicketConfirmed}
    />
  );

  return (
    <>
      <FormFields>
        <Field label="Name" labelFor="name">
          <Input
            id="name"
            type="text"
            value={eventData.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </Field>
        <Field label="Description" labelFor="description">
          <Input
            id="description"
            type="text"
            value={eventData.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
        </Field>
        <Field style={{ width: 'fit-content' }} label="Date" labelFor="date">
          <DatePicker
            id="date"
            selected={eventData.date}
            onChange={(date) => updateField('date', date || minDate)}
            showTimeSelect
            dateFormat="dd/MM/Y HH:mm"
            minDate={minDate}
            popperPlacement="bottom-end"
          />
        </Field>

        <h3>Tickets</h3>
        <Tickets>
          {eventData.tickets.map((ticket, index) =>
            pendingTicketIndex === index ? (
              renderTicketForm(index, ticket)
            ) : (
              <TicketDetails
                key={index}
                ticket={ticket}
                changeDisabled={hasPendingTicket}
                onClickEdit={() => setPendingTicketIndex(index)}
                onClickDelete={() => onClickDeleteTicket(index)}
              />
            ),
          )}
          {hasPendingNewTicket && renderTicketForm()}
        </Tickets>

        {!hasPendingTicket && (
          <Button $secondary onClick={() => setPendingTicketIndex(eventData.tickets.length)}>
            Add ticket
          </Button>
        )}
      </FormFields>

      <Button disabled={!canSubmit} onClick={onClickSubmit}>
        {submitLabel}
      </Button>
    </>
  );
};
