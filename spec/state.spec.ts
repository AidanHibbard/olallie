import { expect, it, describe } from 'vitest';
import { createStore } from '../src/index';

const stateStore = createStore({
  state: {
    count: 1,
  },
});

describe('Store state', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(stateStore.count).toEqual(1);
    });
  });
  describe('State', () => {
    it('Should be usable from store instance', () => {
      stateStore.count++;
      expect(stateStore.count).toEqual(2);
    });
  });
});
