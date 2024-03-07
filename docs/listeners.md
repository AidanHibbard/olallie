---
outline: deep
---
# Listeners

Listeners help keep your code reactive, and are meant to watch individual items in your state. Listeners will provide a list of keys for you to select from the store state, and infer the type of the value.

#### Example

```typescript
import { createStore } from 'olallie';

const store = createStore({
  state: () => ({
    count: 0,
  }),
});

// (parameter) newValue: number, (parameter) oldValue: number
const listener = store.listen('count', (newValue, oldValue) => {
  console.log(`New value: ${newValue}, Old value: ${oldValue}`);
});

store.count++;
```

To disable the listener, call `unlisten()`. This method returns a boolean letting you know if the listener has already been removed.

#### Example

```typescript
listener.unlisten(); // true
// Attempting to unlisten a second time returns false
listener.unlisten(); // false
```