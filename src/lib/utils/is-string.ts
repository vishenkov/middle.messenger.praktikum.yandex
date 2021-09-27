function isString(arg?: unknown): arg is string {
  return typeof arg === 'string';
}

export default isString;
