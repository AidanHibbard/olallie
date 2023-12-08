---
outline: deep
---
# Listeners

listeners help keep your code reactive, and are meant to watch individual items in your state. Listeners will provide a list of keys for you to select from the store state, and infer the type of the value.

#### Example
```typescript
import { createStore } from 'olallie';

const listeners_store = createStore({
  state: (): State => ({
    count: 0,
    event_count: 0,
  }),
});

// (parameter) value: number
listeners_store.listen('count', (value) => {
  listeners_store.event_count = value;
});

listeners_store.count++;
console.log(listeners_store.event_count) // 1
```

Removing your stores listeners is simple.

#### Example
```typescript
listeners_store.unlisten('count');
```