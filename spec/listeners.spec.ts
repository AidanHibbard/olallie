import { expect, it, describe } from 'vitest';
import createStore from '../src';

const listenersStore = createStore({
  state: {
    count: 0,
    listenerCount: 0,
    listenerTwoCount: 0,
  },
});

describe('Store listeners', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(listenersStore.count).toEqual(0);
      expect(listenersStore.listenerCount).toEqual(0);
      expect(listenersStore.listenerTwoCount).toEqual(0);
    });
  });
  describe('Listeners', () => {
    let oldValue: number;
    const listener = listenersStore.listen(
      'count',
      ({ detail }) => {
        oldValue = detail.oldValue;
        listenersStore.listenerCount = detail.value;
      },
      false,
    );
    listenersStore.listen(
      'count',
      ({ detail }) => {
        listenersStore.listenerTwoCount = detail.value;
      },
      false,
    );
    it('Supports multiple listeners', () => {
      listenersStore.count++;
      expect(oldValue).toEqual(0);
      expect(listenersStore.count).toEqual(1);
      expect(listenersStore.listenerCount).toEqual(1);
      expect(listenersStore.listenerTwoCount).toEqual(1);
    });
    it('Supports removing specific listeners', () => {
      listener.unlisten();
      listenersStore.count++;
      expect(listenersStore.count).toEqual(2);
      expect(listenersStore.listenerCount).toEqual(1);
      expect(listenersStore.listenerTwoCount).toEqual(2);
    });
  });
});
