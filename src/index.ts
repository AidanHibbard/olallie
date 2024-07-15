import type { StoreOptions, Store, StoreEvent, ListenerOptions } from './types';

export default function createStore<S extends object, A, G>(
  options: StoreOptions<S, A, G>,
): Store<S, A, G> {
  const target = new EventTarget();

  const state = new Proxy(options.state, {
    set(obj, prop, value) {
      const stateKey = prop as keyof S;
      const oldValue = obj[stateKey];
      const result = Reflect.set(obj, prop, value);
      target.dispatchEvent(
        new CustomEvent(prop as string, {
          detail: {
            value,
            oldValue,
          } as StoreEvent<S, typeof stateKey>['detail'],
        }),
      );
      return result;
    },
  });

  const actions = options.actions ?? ({} as A);

  for (const key in options.getters) {
    if (Object.hasOwn(options.getters, key)) {
      const getter = options.getters[key];
      Object.defineProperty(state, key, {
        get: () => getter(state),
        enumerable: true,
      });
    }
  }

  const store = Object.assign(state, actions) as Store<S, A, G>;

  store.listen = <K extends keyof S>(
    key: K,
    callback: (event: StoreEvent<S, K>) => void,
    options?: ListenerOptions,
  ) => {
    target.addEventListener(key as string, callback as EventListener, options);
    return {
      unlisten: () => {
        target.removeEventListener(
          key as string,
          callback as EventListener,
          options,
        );
      },
    };
  };

  return store;
}
