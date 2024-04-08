'use client';

import { EventUpdate, FullEventItemJson } from '@api/types/events';
import { TicketInput, TicketUpdate } from '@api/types/tickets';
import Link from 'next/link';
import { FunctionComponent, useMemo } from 'react';

import { AppPage, HeadingContainer } from '~/components/common/AppPage';
import { EventForm } from '~/components/shared/EventForm';

interface Props {
  event: FullEventItemJson;
  updateEvent(newEvent: EventUpdate): Promise<void | { error: string }>;
}

type FullEvent = Omit<FullEventItemJson, 'date'> & { date: Date };

export const EventEditPage: FunctionComponent<Props> = ({ event, updateEvent }) => {
  const currentEvent: FullEvent = useMemo(
    () => ({
      ...event,
      date: new Date(event.date),
    }),
    [],
  );

  const onSubmit = async ({ tickets: updatedTickets, ...updatedEvent }: FullEvent) => {
    const modifiedTickets: TicketUpdate[] = [];
    const deletedTicketIds: string[] = [];
    const newTickets: TicketInput[] = updatedTickets.filter(({ _id }) => !_id);

    currentEvent.tickets.forEach(({ _id }) => {
      const modifiedTicket = updatedTickets.find((updatedTicket) => _id === updatedTicket._id);

      if (modifiedTicket) {
        modifiedTickets.push(modifiedTicket);
      } else {
        deletedTicketIds.push(_id);
      }
    });

    await updateEvent({
      ...updatedEvent,
      modifiedTickets,
      deletedTicketIds,
      newTickets,
    });
  };

  return (
    <AppPage>
      <HeadingContainer>
        <h1>Edit Event - {event.name}</h1>
        <Link href="/">View event list</Link>
      </HeadingContainer>

      <EventForm<FullEvent>
        currentEvent={currentEvent}
        submitLabel="Save changes"
        onSubmit={onSubmit}
      />
    </AppPage>
  );
};
