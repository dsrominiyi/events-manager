import { EventListPage } from '~/components/containers/EventListPage';
import { getEventList } from '~/lib/server/events';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const events = await getEventList();

  return <EventListPage events={events} />;
};

export default Page;
