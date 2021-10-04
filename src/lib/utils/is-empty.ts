import isArray from './is-array';
import isObject from './is-object';

function isEmpty(arg: unknown): boolean {
  if (isObject(arg)) {
    return Object.keys(arg).length === 0;
  }

  if (isArray(arg)) {
    return arg.length === 0;
  }

  return false;
}

export default isEmpty;
