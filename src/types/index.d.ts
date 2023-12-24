export type StoreOptions<S, A, G> = {
  state: () => S;
  actions?: A;
  getters?: { [K in keyof G]: (state: S) => G[K] };
};

export type ActionFunction<S, Args extends any[], Result> = (
  state: S,
  ...args: Args
) => Result;

export type Store<
  S,
  A extends Record<string, ActionFunction<S, any, any>>,
  G,
> = S & {
  [K in keyof A]: (...args: Tail<Parameters<A[K]>>) => ReturnType<A[K]>;
} & {
  [K in keyof G]: G[K];
} & {
  listen<K extends keyof S>(
    key: K,
    callback: (value: S[K]) => void,
  ): { unlisten: () => boolean };
};

export type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer U
) => any
  ? U
  : never;
