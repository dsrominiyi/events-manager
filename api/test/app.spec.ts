import { e2eTest } from './helpers/e2eTest';

describe(
  '/',
  e2eTest((e2e) => {
    test('GET /', async () => {
      const response = await e2e.request.get('/');

      expect(response.status).toEqual(200);
      expect(response.text).toEqual('OK!');
    });
  }),
);
