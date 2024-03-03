---
outline: deep
---
# Getting Started

## Installation
- Install the module

  ```bash
  npm i olallie
  ```
- TS config
  - Make sure to change target to ESNext or ES2022

  ```json
    "compilerOptions": {
      "target": "ESNext",
      "strict": true
    },
  ```

## Basic store

```ts
// Import createStore
import { createStore } from 'olallie';

const store = createStore({
  state: () => ({
    count: 1,
  }),
  actions: {
    double() {
      // Actions can access state, getters, and actions
      // this is automatically typed
      this.count = this.doubled;
    },
  },
  getters: {
    // State is automatically typed
    doubled: (state) => this.count * 2,
  },
});

// Access state, actions, and getters from the store
// Types are inferred
console.log(store.count); // 1
console.log(store.double) // 2
console.log(store.doubled) // 4
```
