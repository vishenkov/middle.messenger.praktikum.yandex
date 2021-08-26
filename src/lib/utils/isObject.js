function isObject(arg) {
  return arg && typeof arg === 'object' && Object.prototype.toString.call(arg) === '[object Object]';
}

export default isObject;
