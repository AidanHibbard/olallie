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
const store = createStore({
  state: () => ({
    count: 1,
  }),
});

store.count++;
console.log(store.count); // 2
```

## TypeScript Support

Types in your store should be automatically detected. However, there may be times you want to define specific values for your state.

#### Example
```typescript
// Import Olallie
import { createStore } from 'olallie';

interface State {
  status: 'Queued' | 'Processing' | 'Completed';
};

const store = createStore({
  state: (): State => ({
    status: 'Queued',
  }),
});

// Type '"test"' is not assignable to type '"Queued" | "Processing" | "Completed"'
store.status = 'test';
```