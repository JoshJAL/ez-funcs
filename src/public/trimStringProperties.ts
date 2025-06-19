export function trimStringProperties<T extends Record<string, unknown>>(obj: T): T {
  const result = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        result[key as keyof T] = value.trim() as T[keyof T];
      } else {
        result[key as keyof T] = value as T[keyof T];
      }
    }
  }

  return result;
}
