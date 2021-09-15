function isArray(arg?: unknown): arg is [] {
  if (!arg) {
    return false;
  }

  return typeof arg === 'object' && Array.isArray(arg);
}

export default isArray;
