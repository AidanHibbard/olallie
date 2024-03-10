import { expect, it, describe } from 'vitest';
import { createStore } from '../src/index';

const actionsStore = createStore({
  state: {
    count: 1,
  },
  actions: {
    multiply(value: number) {
      this.count = this.count * value;
      return this.count;
    },
    double() {
      this.count = this.doubled;
      return this.count;
    },
    async promisedAction(): Promise<boolean> {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1);
      });
    },
    actionCaller() {
      return this.double();
    },
  },
  getters: {
    doubled: (state) => state.count * 2,
  },
});

describe('Store actions', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(actionsStore.count).toEqual(1);
    });
  });
  describe('Actions manipulating state', () => {
    it('Should set and return state value', () => {
      expect(actionsStore.multiply(2)).toEqual(2);
    });
  });
  describe('Actions calling getters', () => {
    it('Should set and return state value', () => {
      expect(actionsStore.double()).toEqual(4);
    });
  });
  describe('Actions calling other actions', () => {
    it('Should set and return state value', () => {
      expect(actionsStore.actionCaller()).toEqual(8);
    });
  });
  describe('Async actions', () => {
    it('Should return a promised value', async () => {
      expect(await actionsStore.promisedAction()).toEqual(true);
    });
  });
});
