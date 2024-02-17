export function createProxy<T extends Record<string, any>>(
  target: T,
  onSet: (key: keyof T, value: T[keyof T]) => void,
): T {
  return new Proxy<T>(target, {
    set(obj, prop, value) {
      obj[prop as keyof T] = value;
      onSet(prop as keyof T, value);
      return true;
    },
  });
}

export type StoreOptions<S, A, G> = {
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
  listen<K extends keyof S>(
    key: K,
    callback: (value: S[K]) => void,
  ): { unlisten: () => boolean };
};

export type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer U
) => any
  ? U
  : never;


export function createStore<
  S extends Record<string, any>,
  A extends Record<string, ActionFunction<S, any, any>>,
  G,
>(options: StoreOptions<S, A, G>): Store<S, A, G> {
  const stateProxy = createProxy(options.state(), (key, value) => {
    triggerListeners(key, value);
  });

  const listeners: Record<string, Set<(value: any) => void>> = {};

  for (const key in options.actions) {
    if (Object.hasOwn(options.actions, key)) {
      const action = options.actions[key];
      (stateProxy as Record<string, (...args: any[]) => any>)[key] = (
        ...args: any[]
      ) => {
        const result = action(stateProxy, ...args);
        return result;
      };
    }
  }

  for (const key in options.getters) {
    if (Object.hasOwn(options.getters, key)) {
      const getter = options.getters[key];
      Object.defineProperty(stateProxy, key, {
        get: () => getter(stateProxy),
        enumerable: true,
      });
    }
  }

  (stateProxy as Store<S, A, G>).listen = function <K extends keyof S>(
    key: K,
    callback: (value: S[K]) => void,
  ) {
    if (!listeners[key as string]) {
      listeners[key as string] = new Set();
    }
    listeners[key as string].add(callback);

    return {
      unlisten: () => {
        const listenerSet = listeners[key as string];
        if (listenerSet) {
          return listenerSet.delete(callback);
        }
        return false;
      },
    };
  };

  function triggerListeners<K extends keyof S>(key: K, value: S[K]) {
    const listenerSet = listeners[key as string];
    if (listenerSet) {
      for (const callback of listenerSet) {
        callback(value);
      }
    }
  }

  return stateProxy as Store<S, A, G>;
}
