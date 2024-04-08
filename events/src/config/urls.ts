import { apiUrl } from './appConfig';

export const api = {
  eventList: `${apiUrl}/events`,
  event: (id: string) => `${apiUrl}/events/${id}`,
};
