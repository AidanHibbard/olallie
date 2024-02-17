import { createStore } from '../../src';

interface State {
  count: number;
}

const index_store = createStore({
  state: () => ({
    count: 1,
  }),
  getters: {
    tripled: (state) => state.count * 3,
  },
});

// Should error that test() doesn't exist on index_store
index_store.test();

export default index_store;
