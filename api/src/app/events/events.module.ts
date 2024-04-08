import { Logger, Module, Provider } from '@nestjs/common';
import { Db } from 'mongodb';

import { DATABASE_CONNECTION, EVENT_MODEL } from '~/config/providerTokens';
import EntityModel from '~/lib/EntityModel';
import { Event } from '~/types/events';

import { DatabaseModule } from '../database/database.module';
import { TicketModule } from '../tickets/tickets.module';

import { EventController } from './events.controller';
import { EventService } from './events.service';

export const providers: Provider[] = [
  {
    provide: EVENT_MODEL,
    useFactory: (db: Db) => new EntityModel<Event>(db, 'events', new Logger(EVENT_MODEL)),
    inject: [DATABASE_CONNECTION],
  },
  EventService,
];

@Module({
  imports: [DatabaseModule, TicketModule],
  controllers: [EventController],
  providers,
  exports: [...providers],
})
export class EventModule {}
