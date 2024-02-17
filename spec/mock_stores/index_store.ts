import { createStore } from '../../src';

interface State {
  count: number;
}

const index_store = createStore({
  state: () => ({
    count: 1,
  }),
  actions: {
    add(state, payload: { amount: number }) {
      state.count += payload.amount;
      return payload.amount;
    },
  }
});

// (property) add: (...args: any[]) => any
index_store.add({ amount: 2 });

export default index_store;
