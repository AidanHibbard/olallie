export function createProxy<T extends Record<string, any>>(
  target: T,
  onSet: (key: keyof T, value: T[keyof T]) => void,
): T {
  return new Proxy<T>(target, {
    set(obj, prop, value) {
      obj[prop as keyof T] = value;
      onSet(prop as keyof T, value);
      return true;
    },
  });
}
