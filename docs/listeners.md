---
outline: deep
---
# Listeners

## Creating a listener

Listeners add a touch of reactivity to your code, and use [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) under the hood.

If the [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) in front of your stores state detects a change to a keys value; a [typed Custom Event](./api-reference.md#storeevent) will be dispatched.

You can also pass [event listener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options), see the [API reference](./api-reference.md#listen).

```typescript
import createStore from 'olallie';

const store = createStore({
  state: {
    count: 0,
  },
});

// (parameter) event: StoreEvent<S, K>
const listener = store.listen('count', ({ detail, timeStamp }) => {
  // Values are type-safe
  /*
  param (detail): {
    value: number;
    oldValue: number;
  }
  */
  console.log('%j', {
    newValue: detail.value,
    oldValue: detail.oldValue,
    timeStamp
  });
}, false);

store.count++;
```

## Removing a listener

Removing a listener calls `removeEventListener()` on the stores [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

```typescript
listener.unlisten();
```