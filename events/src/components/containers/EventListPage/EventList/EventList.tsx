import { EventListItemJson } from '@api/types/events';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

import { StockDetails } from '~/components/common/AppPage';
import { formateDateString } from '~/utils/string';

import { DateAndTicketDetails, EventListItem, EventListRoot } from './EventList.styled';

interface Props {
  events: EventListItemJson[];
}

export const EventList: FunctionComponent<Props> = ({ events }) => {
  const router = useRouter();

  const toEventView = (id: string) => router.push(`/event/${id}`);

  return (
    <EventListRoot>
      {events.map(({ _id, name, description, date, isSoldOut }) => (
        <EventListItem key={_id} role="button" onClick={() => toEventView(_id)}>
          <div>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <DateAndTicketDetails>
            <p>{formateDateString(date)}</p>
            <StockDetails $inStock={!isSoldOut}>
              {isSoldOut ? 'SOLD OUT' : 'Tickets available'}
            </StockDetails>
          </DateAndTicketDetails>
        </EventListItem>
      ))}
    </EventListRoot>
  );
};
