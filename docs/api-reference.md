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
const store = createStore({ ...storeOptions });
```

## Store Options

### State

- Type: `() => S`
- Required: true

  ```ts
  state: () => ({ ... });
  ```

  State is the only required key, and is an arrow function returning a record. You can read more about state in its [documentation](/state).

### Actions

- Type: `{ A & ThisType<S & A & G> }`
- Required: false

  Add methods to the store that mutate, and return state values. You can read more about actions in their [documentation](/actions).

### Getters

- Type: `{ [K in keyof G]: (state: S) => G[K] }`
- Required: false

  Add getters to the store that return computed state values. Read more about them in the [documentation](/getters)

## `#listen`

- Store method

  Select a key of the state, listen to its new, and (optionally) previous values. Read more in the listeners [documentation](/listeners)

  ```ts
  function listen<K extends keyof S>(
    key: K,
    callback: (newValue: S[K], oldValue: S[K]) => void,
  ): { unlisten: () => boolean };
  ```