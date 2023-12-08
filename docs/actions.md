---
outline: deep
---
# Actions

Actions are written similar to Vuex mutations. They take the state as a parameter, and mutate, or use the state in the action logic. However, actions can be async, and are called directly from the store.

#### Example:
```typescript
// Import Olallie
import { createStore } from 'olallie';

// Setup the store
const actions_store = createStore({
  state: () => ({
    response: undefined,
    loading: false,
  }),
  actions: {
    // Always pass state to actions
    async fetchResponse(state, query: string) {
      state.loading = true;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(query);
        }, 2000);
      });
      state.response = 'Hello!';
      state.loading = false;
    },
  },
});

await actions_store.fetchResponse('test');
const response: string | undefined = actions_store.response;
```

