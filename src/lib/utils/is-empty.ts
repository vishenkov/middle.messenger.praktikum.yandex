import isArray from './is-array';
import isNull from './is-null';
import isObject from './is-object';
import isString from './is-string';
import isNumber from './is-number';
import isUndefined from './is-undefined';

function isEmpty(arg: unknown): boolean {
  if (isObject(arg)) {
    return Object.keys(arg).length === 0;
  }

  if (isArray(arg)) {
    return arg.length === 0;
  }

  if (isString(arg)) {
    return arg.length === 0;
  }

  if (isNumber(arg)) {
    return false;
  }

  if (isNull(arg)) {
    return true;
  }

  if (isUndefined(arg)) {
    return true;
  }

  return false;
}

export default isEmpty;
