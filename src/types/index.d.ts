export interface StoreOptions<S, A, G> {
  state: () => S;
  actions?: A & ThisType<S & A & G>;
  getters?: { [K in keyof G]: (state: S) => G[K] };
}

export type Store<S, A, G> = S &
  A &
  G & {
    listen<K extends keyof S>(
      key: K,
      callback: (value: S[K]) => void,
    ): { unlisten: () => boolean };
  };
