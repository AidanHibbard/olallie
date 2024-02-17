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

// Coming back as incorrect type of: (property) add: (...args: any[]) => any
// should be: (method) add: ({ amount: number }) => number
index_store.add({ amount: 2 });

export default index_store;
