import { expect, it, describe } from 'vitest';
import createStore from '../src';

const gettersStore = createStore({
  state: {
    count: 1,
  },
  getters: {
    doubled: (state) => state.count * 2,
  },
});

describe('Store getters', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(gettersStore.count).toEqual(1);
    });
  });
  describe('Getters', () => {
    it('Should return a computed value', () => {
      expect(gettersStore.doubled).toEqual(2);
    });
  });
});
