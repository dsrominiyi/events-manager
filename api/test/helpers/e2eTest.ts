import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { AppModule } from '~/app/app.module';
import mongoClient from '~/lib/mongoClient';

interface TestParams {
  request: TestAgent;
}

export const e2eTest = (testCallback: (params: TestParams) => void) => () => {
  let mongoServer: MongoMemoryServer;
  let app: INestApplication;
  const testParams = <TestParams>{};

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({ instance: { port: +process.env.DB_PORT! } });
    await mongoClient.connect();

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testParams.request = supertest(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
    await mongoServer.stop({ doCleanup: true });
  });

  testCallback(testParams);
};
