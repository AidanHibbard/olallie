import { expect, it, describe } from 'vitest';
import { createStore } from '../src';

describe('Store', () => {
  const test_store = createStore({
    state: () => ({
      count: 1,
    }),
    actions: {
      increment(state, name: string) {
        state.count++;
        return {
          count: state.count,
          name: name,
        };
      },
    },
    getters: {
      doubled: (state) => state.count * 2,
    },
  });
  describe('State', () => {
    it('Should have predefined state', () => {
      expect(test_store.count).toEqual(1);
    });
  });

  describe('Getters', () => {
    it('Should return a manipulated state', () => {
      expect(test_store.doubled).toEqual(2);
    });
  });

  describe('Actions', () => {
    it('Should manipulate state', () => {
      expect(test_store.increment('test')).toEqual({
        count: 2,
        name: 'test',
      });
      expect(test_store.count).toEqual(2);
    });
  });
});
