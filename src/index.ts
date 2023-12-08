export type StoreOptions<
  S,
  A extends Record<string, (...args: any[]) => any>,
  G,
> = {
  state: () => S;
  actions?: A;
  getters?: { [K in keyof G]: (state: S) => G[K] };
};

export type ActionFunction<S, Args extends any[], Result> = (
  state: S,
  ...args: Args
) => Result;

export type Store<
  S,
  A extends Record<string, ActionFunction<S, any, any>>,
  G,
> = S & {
  [K in keyof A]: (...args: Tail<Parameters<A[K]>>) => ReturnType<A[K]>;
} & {
  [K in keyof G]: G[K];
} & {
  listen<K extends keyof S>(key: K, callback: (value: S[K]) => void): void;
  unlisten<K extends keyof S>(key: K): void;
};

export type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer U
) => any
  ? U
  : never;

export function createStore<
  S,
  A extends Record<string, ActionFunction<S, any, any>>,
  G,
>(options: StoreOptions<S, A, G>): Store<S, A, G> {
  const store = options.state();
  const listeners: Record<string, Array<(value: any) => void>> = {};

  for (const key in options.actions) {
    if (Object.hasOwnProperty.call(options.actions, key)) {
      const action = options.actions[key];
      (store as Record<string, (...args: any[]) => any>)[key] = (
        ...args: any[]
      ) => {
        const result = action(store, ...args);
        /*
          Argument of type 'Extract<keyof A, string>' is not assignable to parameter of type 'keyof S'.
            Type 'string' is not assignable to type 'keyof S'.ts(2345)
          const key: Extract<keyof A, string>

          Type 'Extract<keyof A, string>' cannot be used to index type 'S'.ts(2536)
          const key: Extract<keyof A, string>
        */
        triggerListeners(key, store[key]);
        return result;
      };
    }
  }

  for (const key in options.getters) {
    if (Object.hasOwnProperty.call(options.getters, key)) {
      const getter = options.getters[key];
      Object.defineProperty(store, key, {
        get: () => getter(store),
        enumerable: true,
      });
    }
  }

  (store as Store<S, A, G>).listen = function <K extends keyof S>(key: K, callback: (value: S[K]) => void) {
    if (!listeners[key as string]) {
      listeners[key as string] = [];
    }
    listeners[key as string].push(callback);
  };

  (store as Store<S, A, G>).unlisten = function <K extends keyof S>(key: K) {
    delete listeners[key as string];
  };

function triggerListeners<K extends keyof S>(key: K, value: S[K]) {
  const keyListeners = listeners[key as string];
  if (keyListeners) {
    for (const callback of keyListeners) {
      callback(value);
    }
  }
}

  return store as Store<S, A, G>;
}

const test_store = createStore({
  state: () => ({
    count: 1,
    name: 'hello'
  }),
  actions: {
    increment(state, name: string) {
      state.count++;
      return {
        count: state.count,
        name: name,
      };
    },
  },
  getters: {
    doubled: (state) => state.count * 2,
  },
});

test_store.listen('count', (value) => {
  console.log(value);
});
test_store.count++;
test_store.increment('hello');
test_store.unlisten('count');
test_store.count++;



