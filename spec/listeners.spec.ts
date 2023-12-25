import { expect, it, describe } from 'vitest';
import listeners_store from './mock_stores/listeners_store';

describe('Store Listeners', () => {
  const listener_one = listeners_store.listen('count', (value) => {
    listeners_store.event_count = value;
  });
  const listener_two = listeners_store.listen('count', (value) => {
    listeners_store.second_event_count = value;
  });
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(listeners_store.event_count).toEqual(0);
      expect(listeners_store.second_event_count).toEqual(0);
      expect(listeners_store.count).toEqual(0);
    });
  });
  describe('Listen', () => {
    it('Should listen for state changes', () => {
      listeners_store.count++;
      expect(listeners_store.count).toEqual(1);
      expect(listeners_store.event_count).toEqual(listeners_store.count);
      expect(listeners_store.second_event_count).toEqual(listeners_store.count);
    });
  });
  describe('Unlisten', () => {
    it('Should remove listeners for state item and return true', () => {
      expect(listener_one.unlisten()).toBeTruthy();
      listeners_store.count++;
      expect(listeners_store.count).toEqual(2);
      expect(listeners_store.event_count).toEqual(listeners_store.count - 1);
    });
    it('Should not remove other listeners for the same key', () => {
      expect(listeners_store.second_event_count).toEqual(listeners_store.count);
    });
    it('Should return false if listener was already removed', () => {
      expect(listener_one.unlisten()).toBeFalsy();
    });
    it('Should return true for second listener unlistening on the same key', () => {
      expect(listener_two.unlisten()).toBeTruthy();
    });
  });
});
