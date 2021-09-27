function isArray<T>(arg?: unknown): arg is T[] {
  if (!arg) {
    return false;
  }

  return typeof arg === 'object' && Array.isArray(arg);
}

export default isArray;
