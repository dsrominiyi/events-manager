import { EventDisplayPage } from '~/components/containers/EventDisplayPage/EventDisplayPage';
import { getEvent } from '~/lib/server/events';

interface Props {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

const Page = async ({ params }: Props) => {
  const event = await getEvent(params.id);

  return <EventDisplayPage event={event} />;
};

export default Page;
