function isPrimitive(arg?: unknown): boolean {
  if (!arg) {
    return false;
  }

  if (typeof arg === 'string') {
    return true;
  }

  if (typeof arg === 'number') {
    return true;
  }

  if (typeof arg === 'boolean') {
    return true;
  }

  return false;
}

export default isPrimitive;
