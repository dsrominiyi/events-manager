import { Module, Provider } from '@nestjs/common';

import { DATABASE_CONNECTION } from '~/config/providerTokens';
import mongoClient from '~/lib/mongoClient';

const providers: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: () => mongoClient.db(),
  },
];

@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
