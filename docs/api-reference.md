---
outline: deep
---
# API Reference

## `createStore`

```ts
createStore<S, A, G>(options: StoreOptions<S, A, G>): Store<S, A, G>
```

Instantiates a new store.

```ts
const store = createStore({ state: {}, actions: {}, getters: {} });
```

## Store Options

### State

- Type: `S extends object`
- Required: true

  State is the only required key, and is an object representing your stores initial state. You can read more about state in its [documentation](./state).

### Actions

- Type: `{ A & ThisType<S & A & G> }`
- Required: false

  Add methods to the store that mutate, and return state values. You can read more about actions in their [documentation](./actions).

### Getters

- Type: `{ [K in keyof G]: (state: S) => G[K] }`
- Required: false

  Add getters to the store that return computed state values. Read more about them in the [documentation](./getters).

## Store methods

### `#listen`

  Select a key of the state, listen to its new, and previous value. Read more in the listeners [documentation](./listeners).

  ```typescript
  function listen<K extends keyof S>(
    key: K,
    callback: (event: StoreEvent<S, K>) => void,
    options?: AddEventListenerOptions | boolean,
  ): { unlisten: () => void };
  ```

## Custom types

### StoreEvent

  Extends [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), with the event detail containing new, and previous values for the [listened to key](./listeners.md).

  ```typescript
  interface StoreEvent<S, K extends keyof S> extends CustomEvent {
    detail: {
      value: S[K];
      oldValue: S[K];
    };
  }
  ```