function isNull(arg?: unknown): arg is null {
  return arg === null;
}

export default isNull;
