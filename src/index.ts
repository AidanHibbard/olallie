import type { StoreOptions, Store, CustomEventListener } from './types';

export function createStore<S extends object, A, G>(
  options: StoreOptions<S, A, G>,
): Store<S, A, G> {
  const target = new EventTarget();

  const state = new Proxy(options.state, {
    set(obj, prop, newValue) {
      const oldValue = obj[prop as keyof S];
      obj[prop as keyof S] = newValue;
      target.dispatchEvent(
        new CustomEvent(prop as string, {
          detail: {
            newValue,
            oldValue,
          },
        },
      ));
      return true;
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

  store.listen = function <K extends keyof S>(
    key: K,
    callback: CustomEventListener<S, K>,
    options?: AddEventListenerOptions,
  ) {
    target.addEventListener(key as string, callback, options);
    return {
      unlisten: () => {
        return target.removeEventListener(key as string, callback, options);
      },
    };
  };

  return store;
}

const store = createStore({
  state: {
    test: 1
  }
})

store.listen('test', )


