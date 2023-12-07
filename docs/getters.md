# Getters
Getters are accessors of the store state, and should be used to return computed values.

#### Example
```typescript
// Import Olallie
import { createStore } from 'olallie';

// Setup the store
const getters_store = createStore({
  state: () => ({
    first_name: 'Test',
    last_name: 'Name'
  }),
  getters: {
    greeting: (state) => `Hello ${state.first_name} ${state.last_name}`
  },
});

const { greeting } = getters_store;
console.log(greeting) // Hello Test Name