import type { StoreOptions, Store } from './types';

export function createStore<S, A, G>(
  options: StoreOptions<S, A, G>,
): Store<S, A, G> {
  const listeners: Record<string, Set<(value: any) => void>> = {};

  const state = new Proxy(options.state() as object, {
    set(obj, prop, value) {
      (obj as S)[prop as keyof S] = value;
      triggerListeners(prop as keyof S, value);
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
    callback: (value: S[K]) => void,
  ) {
    if (!listeners[key as string]) {
      listeners[key as string] = new Set();
    }
    listeners[key as string].add(callback);
    return {
      unlisten: () => {
        const listenerSet = listeners[key as string];
        return listenerSet.delete(callback);
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

  return store;
}

const actionsStore = createStore({
  state: () => ({
    count: 1,
  }),
  actions: {
    multiply(value: number) {
      this.count = this.count * value;
      return this.count;
    },
    double() {
      this.count = this.doubled;
      return this.count;
    },
    async promisedAction(): Promise<boolean> {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1);
      });
    },
    actionCaller() {
      return this.double();
    },
  },
  getters: {
    doubled: (state) => state.count * 2,
  },
});
