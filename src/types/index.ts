export interface StoreEvent<S extends object, K extends keyof S>
  extends CustomEvent {
  detail: {
    value: S[K];
    oldValue: S[K];
  };
}

export type StorePlugin = (store: Store<object, unknown, unknown>) => object;

export type StorePlugins = StorePlugin[];

export interface StoreOptions<S extends object, A, G, P extends StorePlugins> {
  state: S;
  actions?: A & ThisType<S & A & G>;
  getters?: { [K in keyof G]: (state: S) => G[K] };
  plugins?: readonly [...P];
}

export type ListenerOptions = AddEventListenerOptions | boolean;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type PluginReturns<P extends readonly StorePlugin[]> =
  UnionToIntersection<ReturnType<P[number]>>;

export type Store<S extends object, A, G> = S &
  A &
  G & {
    listen<K extends keyof S>(
      key: K,
      callback: (event: StoreEvent<S, K>) => void,
      options?: ListenerOptions,
    ): { unlisten: () => void };
  };
