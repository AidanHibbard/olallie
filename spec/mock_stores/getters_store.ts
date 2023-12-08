import { createStore } from '../../src';

interface State {
  count: number;
}

const getters_store = createStore({
  state: (): State => ({
    count: 1,
  }),
  getters: {
    tripled: (state) => state.count * 3,
  },
});

export default getters_store;
