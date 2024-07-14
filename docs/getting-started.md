---
outline: deep
---
# Getting Started

## Installation

- Install the module

  ```bash
  npm i olallie
  ```

## Basic store

All that's needed to get started is a state object.

```ts
// Import createStore
import createStore from 'olallie';
// or
// const createStore = require('olallie');

// A basic store only requires a state
const store = createStore({
  state: { count: 0 },
});

console.log(store.count); // 0
// (param) count: number;
store.count++
console.log(store.count); // 1
```

Although Olallie will infer the types in your stores state, however, you can add stricter types.

```ts
interface State {
  status: 'Loading' | 'Finished';
}

const store = createStore({
  state: {
    status: 'Loading',
  } as State,
});

// Type '"Test"' is not assignable to type '"Loading" | "Finished"'.
store.status = 'Test';
```

Want to go further? [Read more about state](./state.md).



