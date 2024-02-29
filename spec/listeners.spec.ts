import { expect, it, describe } from 'vitest';
import { createStore } from '../src/index';

const listenersStore = createStore({
  state: () => ({
    count: 0,
    listenerCount: 0,
    listenerTwoCount: 0,
  }),
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
    const listener = listenersStore.listen('count', (value) => {
      listenersStore.listenerCount = value;
    });
    const listenerTwo = listenersStore.listen('count', (value) => {
      listenersStore.listenerTwoCount = value;
    });
    it('Supports multiple listeners', () => {
      listenersStore.count++;
      expect(listenersStore.count).toEqual(1);
      expect(listenersStore.listenerCount).toEqual(1);
      expect(listenersStore.listenerTwoCount).toEqual(1);
    });
    it('Supports removing specific listeners', () => {
      expect(listener.unlisten()).toBeTruthy();
      listenersStore.count++;
      expect(listenersStore.count).toEqual(2);
      expect(listenersStore.listenerCount).toEqual(1);
      expect(listenersStore.listenerTwoCount).toEqual(2);
    });
    it('Returns false if listener has already been removed', () => {
      expect(listener.unlisten()).toBeFalsy();
    });
    it('Returns true when removing a second listener for the same key', () => {
      expect(listenerTwo.unlisten()).toBeTruthy();
    });
  });
});
