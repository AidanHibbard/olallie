import { expect, it, describe } from 'vitest';
import listeners_store from './mock_stores/listeners_store';

describe('Store Listeners', () => {
  describe('Initial State', () => {
    it('Should have default values', () => {
      expect(listeners_store.event_count).toEqual(0);
      expect(listeners_store.second_event_count).toEqual(0);
      expect(listeners_store.count).toEqual(0);
    });
  });
  describe('Listeners', () => {
    it('Should listen for state changes', () => {
      listeners_store.listen('count', (value) => {
        listeners_store.event_count = value;
      });
      listeners_store.count++;
      expect(listeners_store.event_count).toEqual(listeners_store.count);
    });
    it('Should remove listeners for state item', () => {
      listeners_store.unlisten('count');
      listeners_store.count++;
      expect(listeners_store.event_count).toEqual(listeners_store.count - 1);
    });
  });
});
