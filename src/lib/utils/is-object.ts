function isObject(arg?: unknown): boolean {
  if (!arg) {
    return false;
  }

  return typeof arg === 'object' && Object.prototype.toString.call(arg) === '[object Object]';
}

export default isObject;
