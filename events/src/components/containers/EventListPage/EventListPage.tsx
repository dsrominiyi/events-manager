'use client';

import { EventListItemJson } from '@api/types/events';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { AppPage, HeadingContainer } from '~/components/common/AppPage';

import { EventList } from './EventList';

interface Props {
  events: EventListItemJson[];
}

export const EventListPage: FunctionComponent<Props> = ({ events }) => (
  <AppPage>
    <HeadingContainer>
      <h1>Events</h1>
      <Link href="/event">Add new event</Link>
    </HeadingContainer>

    <EventList events={events} />
  </AppPage>
);
