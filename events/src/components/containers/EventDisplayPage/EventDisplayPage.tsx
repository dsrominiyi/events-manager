'use client';

import { FullEventItemJson } from '@api/types/events';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { AppPage, HeadingContainer } from '~/components/common/AppPage';
import { formateDateString } from '~/utils/string';

import { LinksContainer } from './EventDisplayPage.styled';
import { TicketList } from './TicketList';

interface Props {
  event: FullEventItemJson;
}

export const EventDisplayPage: FunctionComponent<Props> = ({
  event: { _id, name, description, date, tickets },
}) => (
  <AppPage>
    <HeadingContainer>
      <h1>{name}</h1>
      <LinksContainer>
        <Link href={`/event/${_id}/edit`}>Edit event</Link>|<Link href="/">View event list</Link>
      </LinksContainer>
    </HeadingContainer>

    <h2>{description}</h2>
    <p>{formateDateString(date)}</p>

    {!!tickets.length && (
      <>
        <h3>Tickets</h3>
        <TicketList tickets={tickets} />
      </>
    )}
    {!tickets.length && <h4>No tickets available 😞</h4>}
  </AppPage>
);
