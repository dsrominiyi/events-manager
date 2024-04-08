import { CreateEventResponseJson, EventInput } from '@api/types/events';
import { redirect } from 'next/navigation';

import { EventCreationPage } from '~/components/containers/EventCreationPage';
import { api } from '~/config/urls';

const createEvent = async (eventInput: EventInput) => {
  'use server';

  const response = await fetch(api.eventList, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventInput),
  });

  if (!response.ok) {
    return { error: 'Something went wrong' };
  }

  const createResponse: CreateEventResponseJson = await response.json();

  redirect(`/event/${createResponse._id}`);
};

const Page = async () => <EventCreationPage createEvent={createEvent} />;

export default Page;
