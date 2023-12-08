import { expect, it, describe } from 'vitest';
import getters_store from './mock_stores/getters_store';

describe('Store Getters', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(getters_store.count).toEqual(1);
    });
  });
  describe('Getters', () => {
    it('Should access and return a computed state', () => {
      expect(getters_store.tripled).toEqual(3);
    });
  });
});
