import { createStore } from '../../src';

interface State {
  response: undefined | string;
}

const actions_store = createStore({
  state: (): State => ({
    response: undefined,
  }),
  actions: {
    async fetchResponse(state, query: string): Promise<void> {
      await new Promise((resolve) => {
        setTimeout(() => {
          state.response = query;
          resolve(true);
        }, 1000);
      });
    },
    resetResponse(state) {
      state.response = undefined;
    },
  },
});

export default actions_store;
