export interface StoreEvent<S, K extends keyof S> extends CustomEvent {
  detail: {
    value: S[K];
    oldValue: S[K];
  };
}

export interface StoreOptions<S extends object, A, G> {
  state: S;
  actions?: A & ThisType<S & A & G>;
  getters?: { [K in keyof G]: (state: S) => G[K] };
}

export type ListenerOptions = AddEventListenerOptions | boolean;

export type Store<S, A, G> = S &
  A &
  G & {
    listen<K extends keyof S>(
      key: K,
      callback: (event: StoreEvent<S, K>) => void,
      options?: ListenerOptions,
    ): { unlisten: () => void };
  };
