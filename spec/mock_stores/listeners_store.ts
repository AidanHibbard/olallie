import { createStore } from '../../src';

interface State {
  event_count: number;
  count: number;
  second_event_count: number;
}

const listeners_store = createStore({
  state: (): State => ({
    event_count: 0,
    second_event_count: 0,
    count: 0,
  }),
});

export default listeners_store;
