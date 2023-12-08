# Olallie

## Background
The goal was to create a simple, and type-safe store to use in framework-less apps.

Existing stores written in Vuex, or Pinia needed to be able to migrate over quickly, and with minimal changes.

The name Olallie comes from a [lake in Oregon.](https://www.fs.usda.gov/recarea/mthood/recarea/?recid=52978)

## Opinions

- Actions always use `state` as the first parameter.

## Getting Started
### Installation
Install the module
  ```bash
  npm i olallie
  ```
  - Optional: Install types
  ```bash
  npm i -D @types/olallie
  ```
TS config
  - Make sure to change target to ESNext or ES2022
### Basic store
Olallie follows a Pinia like store pattern
  ```typescript
  import { createStore } from 'olallie';

  const test_store = createStore({
    state: () => ({
      count: 1,
    }),
    actions: {
      // Always pass state to actions
      // State it automatically typed
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
