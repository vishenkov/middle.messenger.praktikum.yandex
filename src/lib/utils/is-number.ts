function isNumber(arg: unknown): arg is Number {
  return !Number.isNaN(Number(arg));
}

export default isNumber;
