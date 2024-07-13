export interface CustomEventListener<S, K extends keyof S> extends EventListener {
  detail: {
    newValue: S[K];
    oldValue: S[K];
  };
}

export interface CustomEventListenerObject<S, K extends keyof S> extends EventListenerObject {
  detail: {
    newValue: S[K];
    oldValue: S[K];
  };
}

export interface StoreOptions<S extends object, A, G> {
  state: S;
  actions?: A & ThisType<S & A & G>;
  getters?: { [K in keyof G]: (state: S) => G[K] };
}

export type Store<S, A, G> = S &
  A &
  G & {
    listen<K extends keyof S>(
      key: K,
      callback: CustomEventListener<S, K> | CustomEventListenerObject<S, K>,
      options?: AddEventListenerOptions,
    ): { unlisten: () => void; };
  };
