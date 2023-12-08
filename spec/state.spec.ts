import { expect, it, describe } from 'vitest';
import state_store from './mock_stores/state_store';

describe('Store getters', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(state_store.count).toEqual(1);
    });
  });
  describe('State', () => {
    it('Should be usable from store instance', () => {
      state_store.count++;
      expect(state_store.count).toEqual(2);
    });
  });
});
