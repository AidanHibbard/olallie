# Olallie

![GitHub Actions Workflow Status](https://github.com/AidanHibbard/olallie/actions/workflows/spec.yml/badge.svg?branch=main)
![NPM License](https://img.shields.io/npm/l/olallie)
![NPM Downloads](https://img.shields.io/npm/dw/olallie)
![NPM Version](https://img.shields.io/npm/v/olallie)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/olallie)

## Background

Built to be a lightweight state management tool for framework-less projects.

The name Olallie comes from a [lake in Oregon.](https://www.fs.usda.gov/recarea/mthood/recarea/?recid=52978)

## Quick links

- [State](#state)
- [Actions](#actions)
- [Getters](#getters)
- [Listeners](#listeners)
- [Upgrade Guide](https://aidanhibbard.github.io/olallie/upgrade-guide.html)

## Example usage

```ts
import createStore from 'olallie';

const store = createStore({
  state: {
    count: 0
  },
  actions: {
    add(value: number) {
      // Actions have access to
      // state, getters, and other actions
      this.count += value;
      return this.count;
    },
  },
  getters: {
    // State is automatically inferred
    doubled: (state) => state.count * 2,
  },
});

// Call options from the store
store.add(1); // 1
const count = store.count; // 1
const doubled = store.doubled; // 2
```

## Installation

- Install the module

  ```bash
  npm i olallie
  ```

## Documentation

### State

State is always required when creating a new store, and should be an object.

```ts
const stateStore = createStore({
  state: {
    count: 1,
  },
});
```

State values can be accessed from the store itself with type-safety.

```ts
// (property) count: number
const count = stateStore.count;
```

You can also apply custom types to your state.

```ts
interface State {
  count: number;
}

const stateStore = createStore({
  state: {
    count: 1,
  } as State,
});
```

### Actions

Actions should update, and, or return state values. They have access to state, getters, and other actions through `this`.

```ts
const store = createStore({
  state: {
    count: 0
  },
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

Store actions can also be async.

```ts
const store = createStore({
  state: {
    response: undefined,
  },
  actions: {
    async fetch(userId: string): Promise<boolean> {
      let data;
      await new Promise((resolve) => {
        setTimeout(() => {
          data = {
            id: userId,
            name: 'John Doe'
          };
          resolve(true);
        }, 1);
      });
      this.response = data;
    },
  },
});

await store.fetch('abcd');
const user = store.response;
```

### Getters

Getters should return computed values without manipulating the state itself.

```ts
const store = createStore({
  state: {
    firstName: 'John',
    lastName: 'Doe'
  },
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

Listeners provide a helpful bit of reactivity with your store. They use the [Event Target API](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) under the hood, and will dispatch a [Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) when a state value is changed.

The `listen()` method will provide a list of your stores state keys to choose from, and automatically infer the value for you.

```ts
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
});

store.count++;
```

Listeners can be removed by calling `unlisten()`.

```ts
listener.unlisten();
```

## Contributing

Follow the [contributor guidelines](.github/contributing.md) when opening a PR, or issue.

### Project setup

1. Install the version of node listed in the `.nvmrc`

2. Install modules

3. Run `spec` to lint & unit test


