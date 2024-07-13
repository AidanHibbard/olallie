---
outline: deep
---
# State

State is the only required key in the store, it's an object holding your stores initial data.

#### example
```typescript
// Import Olallie
import createStore from 'olallie';

// Setup the store
const store = createStore({
  state: {
    count: 1,
  },
});

store.count++;
console.log(store.count); // 2
```

## TypeScript Support

Types in your store should be automatically detected. However, there may be times you want to define specific values for your state.

#### Example
```typescript
// Import Olallie
import createStore from 'olallie';

interface State {
  status: 'Queued' | 'Processing' | 'Completed';
};

const store = createStore({
  state: {
    status: 'Queued',
  } as State,
});

// Type '"test"' is not assignable to type '"Queued" | "Processing" | "Completed"'
store.status = 'test';
```