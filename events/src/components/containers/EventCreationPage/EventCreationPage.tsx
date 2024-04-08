'use client';

import { EventInput } from '@api/types/events';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { AppPage, HeadingContainer } from '~/components/common/AppPage';
import { EventForm } from '~/components/shared/EventForm';

interface Props {
  createEvent(newEvent: EventInput): Promise<void | { error: string }>;
}

export const EventCreationPage: FunctionComponent<Props> = ({ createEvent }) => (
  <AppPage>
    <HeadingContainer>
      <h1>New Event</h1>
      <Link href="/">View event list</Link>
    </HeadingContainer>

    <EventForm onSubmit={createEvent} />
  </AppPage>
);
