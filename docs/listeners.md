---
outline: deep
---
# Listeners

Listeners help keep your code reactive, and are meant to watch individual items in your state. Listeners will provide a list of keys for you to select from the store state, and infer the type of the value.

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