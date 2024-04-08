import { EventUpdate } from '@api/types/events';
import { redirect } from 'next/navigation';

import { EventEditPage } from '~/components/containers/EventEditPage';
import { api } from '~/config/urls';
import { getEvent } from '~/lib/server/events';

interface Props {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

const updateEvent = async (eventUpdate: EventUpdate) => {
  'use server';

  const response = await fetch(api.event(eventUpdate._id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventUpdate),
  });

  if (!response.ok) {
    return { error: 'Something went wrong' };
  }
  redirect(`/event/${eventUpdate._id}`);
};

const Page = async ({ params }: Props) => {
  const event = await getEvent(params.id);

  return <EventEditPage event={event} updateEvent={updateEvent} />;
};

export default Page;
