import { createStore } from '../../src';

interface State {
  count: number;
}

const index_store = createStore({
  state: () => ({
    count: 1,
  }),
  actions: {
    // State type should be inferred here
    // state: any
    add(state, payload: { amount: number }) {
      state.count += payload.amount;
      return payload.amount;
    },
  }
});

index_store.add({ amount: 2 });

export default index_store;
