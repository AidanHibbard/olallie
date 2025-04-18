import { expect, it, describe } from 'vitest';
import createStore from '../src';

const plugin = () => ({
  newValue: 1,
});

const store = createStore({
  state: {
    count: 1,
  },
  plugins: [plugin],
});

describe('Store state', () => {
  describe('Initial state', () => {
    it('Should have default values', () => {
      expect(store.newValue).toEqual(1);
    });
  });
  describe('Updating state', () => {
    it('Should be usable from store instance', () => {
      store.newValue++;
      expect(store.newValue).toEqual(2);
    });
  });
});
