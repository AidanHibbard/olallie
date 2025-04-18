import {
  StorePlugins,
  StoreOptions,
  Store,
  PluginReturns,
  StoreEvent,
  ListenerOptions,
} from './types';

export default function createStore<
  S extends object,
  A,
  G,
  P extends StorePlugins,
>(options: StoreOptions<S, A, G, P>): Store<S & PluginReturns<P>, A, G> {
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

  const pluginReturns = options.plugins?.map((plugin) => plugin(store)) ?? [];
  const finalPluginReturns: Record<string, any> = {};

  for (const pluginReturn of pluginReturns) {
    Object.assign(finalPluginReturns, pluginReturn);
  }

  const final = Object.assign(state, {
    ...actions,
    ...finalPluginReturns,
  }) as Store<S & PluginReturns<P>, A, G>;

  final.listen = <K extends keyof (S & PluginReturns<P>)>(
    key: K,
    callback: (event: StoreEvent<S & PluginReturns<P>, K>) => void,
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

  return final;
}
