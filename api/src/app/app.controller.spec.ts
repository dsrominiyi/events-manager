import { AppController } from './app.controller';

const controller = new AppController();

describe('AppController', () => {
  describe('healthCheck', () => {
    it('should return "OK!"', () => {
      const result = controller.healthCheck();

      expect(result).toBe('OK!');
    });
  });
});
