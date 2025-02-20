---
outline: deep
---

# Upgrading Olallie

## 0.0.7 -> 0.0.8

- [createStore](./getting-started.md)

  - createStore is now a default export

  ```typescript
  // 0.0.7 OLD
  import { createStore } from 'olallie';

  // 0.0.8 NEW
  import createStore from 'olallie';
  ```

- [Listeners](./listeners.md)

  - Listeners now use [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
  - Listeners will receive a [StoreEvent](./api-reference.md#storeevent) on state change.

  ```typescript
  // 0.0.7 OLD
  store.listen('key', (newValue, oldValue) => {});

  // 0.0.8 NEW
  store.listen(
    'key',
    ({ detail: { value, oldValue } }) => {},
    AddEventListenerOptions | boolean,
  );
  ```

## 0.0.6 -> 0.0.7

- [State](./state.md)

  - Defined with an object, rather than an arrow function.

  ```typescript
  // 0.0.6 OLD
  const store = createStore({
    state: () => ({
      ...
    }),
  });

  // 0.0.7 NEW
  const store = createStore({
    state: { ... },
  });
  ```

## 0.0.4 -> 0.0.5

- [Actions](./actions.md)

  - No longer require state to be passed as first parameter. Instead they can now access store instance through `this` with type defintions.

  ```typescript
  // 0.0.4 OLD
  actions: {
    add(state, value: number) {
      state.count += value;
      return state.count;
    },
  },

  // 0.0.5 NEW
  actions: {
    add(value: number) {
      // Actions have access to
      // state, getters, and other actions
      this.count += value;
      return this.count;
    },
  },
  ```
