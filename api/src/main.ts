import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import mongoClient from './lib/mongoClient';

const { PORT } = process.env;

async function bootstrap() {
  await mongoClient.connect();

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT ? +PORT : 80);
}
bootstrap();
