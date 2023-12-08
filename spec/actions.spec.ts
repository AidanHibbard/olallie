import { expect, it, describe } from 'vitest';
import actions_store from './mock_stores/actions_store';

describe('Store Actions', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(actions_store.response).toEqual(undefined);
    });
  });
  describe('Actions', () => {
    it('Should mutate state with params', async () => {
      await actions_store.fetchResponse('test');
      const { response } = actions_store;
      expect(response).toEqual('test');
    });
    it('Should not require state param be passed', () => {
      actions_store.resetResponse();
      const { response } = actions_store;
      expect(response).toEqual(undefined);
    });
  });
});
