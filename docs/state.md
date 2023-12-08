---
outline: deep
---
# State

State in a store is defined with an arrow funtion, and should return an object. You can access the state directly from the store itself.

#### example
```typescript
// Import Olallie
import { createStore } from 'olallie';

// Setup the store
const state_store = createStore({
  /*
    (property) state: () => {
      item_one: number;
      item_two: number;
    }
  */
  state: () => ({
    item_one: 1,
    item_two: 2
  }),
});

const { item_one, item_two } = state_store;
```

## TypeScript Support
Types in your store should be automatically detected, however there may be times you want to define specific values for your state.

#### Example
```typescript
// Import Olallie
import { createStore } from 'olallie';

// Create a state type
interface StateModel {
  queue_status: 'Queued' | 'Processing' | 'Completed';
};

const test_store = createStore({
  // (property) state: () => StateModel
  state: (): StateModel => ({
    queue_status: 'Queued',
  }),
});

// Type '"test"' is not assignable to type '"Queued" | "Processing" | "Completed"'
test_store.queue_status = 'test';
```