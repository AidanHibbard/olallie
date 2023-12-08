import { createStore } from '../../src';

interface State {
  count: number;
}

const state_store = createStore({
  state: (): State => ({
    count: 1,
  }),
});

export default state_store;
