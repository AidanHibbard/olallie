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
## Basic store
- Olallie follows a Pinia like store pattern
  ```typescript
  import { createStore } from 'olallie';

  const test_store = createStore({
    state: () => ({
      count: 1,
    }),
    actions: {
      add(state, amount: number) {
        state.count += amount;
        return state.count;
      },
    },
    getters: {
      doubled: (state) => state.count * 2,
    },
  });

  // The store can be used as
  const count: number = test_store.count; // 1
  const new_count: number = test_store.add(3); // 4
  const doubled_count: number = test_store.doubled; // 8
  ```