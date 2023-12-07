import type { ActionFunction, Store, StoreOptions } from './types';

export function createStore<
  S,
  A extends Record<string, ActionFunction<S, any, any>>,
  G,
>(options: StoreOptions<S, A, G>): Store<S, A, G> {
  const store = options.state();

  for (const key in options.actions) {
    if (Object.hasOwn(options.actions, key)) {
      const action = options.actions[key];
      (store as Record<string, (...args: any[]) => any>)[key] = (
        ...args: any[]
      ) => action(store, ...args);
    }
  }

  for (const key in options.getters) {
    if (Object.hasOwn(options.getters, key)) {
      const getter = options.getters[key];
      Object.defineProperty(store, key, {
        get: () => getter(store),
        enumerable: true,
      });
    }
  }

  return store as Store<S, A, G>;
}
