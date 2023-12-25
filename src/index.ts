import { createProxy } from './utils/create_proxy';
import type { ActionFunction, Store, StoreOptions } from './types';

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
