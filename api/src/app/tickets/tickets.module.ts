import { Logger, Module, Provider } from '@nestjs/common';
import { Db } from 'mongodb';

import { DATABASE_CONNECTION, TICKET_MODEL } from '~/config/providerTokens';
import EntityModel from '~/lib/EntityModel';
import { Event } from '~/types/events';

import { DatabaseModule } from '../database/database.module';

import { TicketService } from './ticket.service';

export const providers: Provider[] = [
  {
    provide: TICKET_MODEL,
    useFactory: (db: Db) => new EntityModel<Event>(db, 'tickets', new Logger(TICKET_MODEL)),
    inject: [DATABASE_CONNECTION],
  },
  TicketService,
];

@Module({
  imports: [DatabaseModule],
  providers,
  exports: [...providers],
})
export class TicketModule {}
