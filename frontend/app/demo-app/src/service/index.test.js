import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiClient, { userService } from './index';

describe('apiClient', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should throw an error for non-2xx responses', async () => {
    mock.onGet('/users').reply(404, { message: 'Not Found' });

    await expect(userService.getAllUsers()).rejects.toThrow();
  });

  it('should not throw an error for 2xx responses', async () => {
    mock.onGet('/users').reply(200, [{ id: 1, name: 'Test User' }]);

    await expect(userService.getAllUsers()).resolves.toEqual([{ id: 1, name: 'Test User' }]);
  });
});
