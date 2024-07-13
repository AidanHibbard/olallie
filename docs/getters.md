---
outline: deep
---
# Getters

Getters are accessors of the store state, and should be used to return computed values.

#### Example

```ts
// Import Olallie
import createStore from 'olallie';

// Setup the store
const store = createStore({
  state: {
    count: 1,
  },
  getters: {
    // state is automatically typed
    doubled: (state) => state.count * 2,
  },
});

console.log(store.doubled); // 2
```