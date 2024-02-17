# Olallie

## Background
The goal was to create a simple, and type-safe store to use in framework-less apps.

Existing stores written in Vuex, or Pinia needed to be able to migrate over quickly, and with minimal changes.

The name Olallie comes from a [lake in Oregon.](https://www.fs.usda.gov/recarea/mthood/recarea/?recid=52978)

## Getting Started
### Installation
Install the module
  ```bash
  npm i olallie
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
      // State is automatically typed
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

### Listeners
Olallie supports listening to mutations of items in your state, and will provide a list keys in your stores state to choose from. The watched value will be automatically inferred.

#### Example
```typescript
import { createStore } from 'olallie';

interface State {
  count: number;
  event_count: number;
};

const listeners_store = createStore({
  state: (): State => ({
    count: 0,
    event_count: 0,
  }),
});

// (parameter) value: number
const listener = listeners_store.listen('count', (value) => {
  listeners_store.event_count = value;
});

listeners_store.count++;
console.log(listeners_store.event_count) // 1
```

To disable the listener, call `unlisten()`. This method returns a boolean letting you know if the listener has already been removed.

#### Example
```typescript
listener.unlisten(); // true
// Attempting to unlisten a second time returns false
listener.unlisten(); // false
```

### Frameworks

#### Vue

To use Olallie in Vue 3, simply wrap your state with reactive.

```typescript
<script setup lang="ts">
import { createStore } from 'olallie';
import { reactive } from 'vue';

const store = createStore({
  state: () => reactive({
    count: 0,
  }),
});
</script>

<template>
  <div>
    <button @click="store.count++">
      {{ store.count }}
    </button>
  </div>
</template>
```
