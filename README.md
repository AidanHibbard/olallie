# Olallie

## Background

Built to be a lightweight, unopinionated, state management tool for framework-less projects.

The name Olallie comes from a [lake in Oregon.](https://www.fs.usda.gov/recarea/mthood/recarea/?recid=52978)

## Example usage

```ts
import { createStore } from 'olallie';

const store = createStore({
  state: (): => ({
    count: 0
  }),
  actions: {
    add(value: number) {
      // Actions have access to
      // state, getters, and other actions
      this.count += value;
      return this.count;
    },
  },
  getters: {
    doubled: (state) => state.count * 2,
  },
});

store.add(1); // 1
const count = store.count; // 1
const doubled = store.doubled; // 2
```

## Installation
- Install the module
  ```bash
  npm i olallie
  ```
- Set your TS Config compiler options target to ESNext
  ```json
    "compilerOptions": {
      "target": "ESNext",
      "strict": true
    },
  ```

## Documentation

### State

State is always required when creating a new store, and should be an arrow function returning a dictionary.

```ts
const stateStore = createStore({
  state: () => ({
    count: 1,
  }),
});
```

State values can be accessed from the store itself with type-safety.

```ts
// (property) count: number
const count = stateStore.count;
```

You can also apply custom types to your state

```ts
interface State {
  count: number;
}

const stateStore = createStore({
  state: (): State => ({
    count: 1,
  }),
});
```

### Actions

Actions should update, and, or return state values. They have access to state, getters, and other actions through `this`.

```ts
const store = createStore({
  state: (): => ({
    count: 0
  }),
  actions: {
    add(value: number) {
      this.count += value;
      return this.count;
    },
    double() {
      this.count = this.doubled;
      return this.count;
    },
    addAndDouble(value: number) {
      this.add(value);
      return this.double();
    },
  },
  getters: {
    doubled: (state) => state.count * 2,
  },
});
```

Store actions can also be async

```ts
const store = createStore({
  state: () => ({
    response: undefined,
  }),
  actions: {
    async fetch(userId: string): Promise<boolean> {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1);
      });
      this.response = {
        id: userId,
        name: 'John Doe'
      };
    },
  },
});

await store.fetch('abcd');
const user = store.response;
```

### Getters

Getters should return computed values without manipulating the state itself.

State is always required to be passed.

```ts
const store = createStore({
  state: () => ({
    firstName: 'John',
    lastName: 'Doe'
  }),
  getters: {
    // State is automatically typed
    /*
    (parameter) state: {
      firstName: string;
      lastName: string;
    }
    */
    fullName: (state) => `${state.firstName} ${state.lastName}`;
  }
});

const name = store.fullName; // "John Doe"
```

### Listeners

Listeners provide a helpful bit of reactivity with your store.

You can assign listeners to specific keys of your stores state with automatic type inference.

```ts
const store = createStore({
  state: () => ({
    count: 0,
  }),
});

// (parameter) value: number
const listener = store.listen('count', (value) => {
  console.log('Listener was called!')
});

store.count++;
```

Listeners can be removed by calling `unlisten()` which will return a boolean.

```ts
listener.unlisten(); // true
listener.unlisten(); // false - Already been removed 
```
