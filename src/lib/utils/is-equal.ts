import isArray from './is-array';
import isObject from './is-object';
import isPrimitive from './is-primitive';

type T = Record<string, unknown>;

function isEqual(arg1: unknown, arg2: unknown): boolean {
  function isEqualArrays<T1>(arr1: T1[], arr2: T1[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i += 1) {
      if (!isEqual(arr1[i], arr2[i])) {
        return false;
      }
    }

    return true;
  }

  function isEqualObjects(obj1: T, obj2: T):boolean {
    if (obj1 === obj2) {
      return true;
    }

    const entries1 = Object.entries(obj1);
    const entries2 = Object.entries(obj1);

    if (entries1.length !== entries2.length) {
      return false;
    }

    for (let i = 0; i < entries1.length; i += 1) {
      const [key1, value1] = entries1[i];

      if (!obj2[key1]) {
        return false;
      }

      const value2 = obj2[key1];

      return isEqual(value1, value2);
    }

    return true;
  }

  function isEqualPrimitives(v1: unknown, v2: unknown) {
    if (v1 === v2) {
      return true;
    }

    if (Number.isNaN(v1) && !Number.isNaN(v2)) {
      return false;
    }

    return v1 === v2;
  }

  if (arg1 === arg2) {
    return true;
  }

  if (typeof arg1 !== typeof arg2) {
    return false;
  }

  if (isObject(arg1) && isObject(arg2)) {
    return isEqualObjects(arg1 as T, arg2 as T);
  }

  if (isArray(arg1) && isArray(arg2)) {
    return isEqualArrays(arg1, arg2);
  }

  if (isPrimitive(arg1) && isPrimitive(arg2)) {
    return isEqualPrimitives(arg1, arg2);
  }

  return arg1 === arg2;
}

export default isEqual;
