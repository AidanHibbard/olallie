import type { StoreOptions, Store } from './types';

export function createStore<S, A, G>(
  options: StoreOptions<S, A, G>,
): Store<S, A, G> {
  const listeners: Record<
    string,
    Set<(newValue: any, oldValue?: any) => void>
  > = {};

  const state = new Proxy(options.state as object, {
    set(obj, prop, value) {
      const oldValue = (obj as S)[prop as keyof S];
      (obj as S)[prop as keyof S] = value;
      triggerListeners(prop as keyof S, value, oldValue);
      return true;
    },
  });

  const actions = options.actions ?? ({} as A);

  for (const key in options.getters) {
    if (Object.hasOwn(options.getters, key)) {
      const getter = options.getters[key];
      Object.defineProperty(state, key, {
        get: () => getter(state as S),
        enumerable: true,
      });
    }
  }

  const store = Object.assign(state, actions) as Store<S, A, G>;

  store.listen = function <K extends keyof S>(
    key: K,
    callback: (newValue: S[K], oldValue: S[K]) => void,
  ) {
    if (!listeners[key as string]) {
      listeners[key as string] = new Set();
    }
    listeners[key as string].add(callback);
    return {
      unlisten: () => {
        return listeners[key as string].delete(callback);
      },
    };
  };

  function triggerListeners<K extends keyof S>(
    key: K,
    newValue: S[K],
    oldValue: S[K],
  ) {
    const listenerSet = listeners[key as string];
    if (listenerSet) {
      for (const callback of listenerSet) {
        callback(newValue, oldValue);
      }
    }
  }

  return store;
}
