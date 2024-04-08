import { EventListItemJson, FullEventItemJson } from '@api/types/events';

import { api } from '~/config/urls';

export const getEventList = async () => {
  const response = await fetch(api.eventList);
  const eventList: EventListItemJson[] = await response.json();

  return eventList;
};

export const getEvent = async (id: string) => {
  const response = await fetch(api.event(id));
  const event: FullEventItemJson = await response.json();

  return event;
};
