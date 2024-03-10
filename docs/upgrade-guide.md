---
outline: deep
---
# Upgrading Olallie

## 0.0.6 -> 0.0.7

- State
  - State is defined with an object, rather than arrow function.

  ```ts
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

## 0.0.5 -> 0.0.6

- Listeners
  - Optionally passes old value to listeners

  ```ts
  // 0.0.5 OLD
  const listener = store.listen('key', (newValue) => {
    ...
  });

  // 0.0.6 NEW
  // OPTIONAL: pass oldValue in listeners
  const listener = store.listen('key', (newValue, oldValue) => {
    ...
  });
  ```

## 0.0.4 -> 0.0.5

- Actions
  - Actions no longer require state to be passed as first parameter. Instead they can now access store instance through `this` with type defintions.

  ```ts
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
