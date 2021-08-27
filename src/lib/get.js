function get(obj, path, defaultValue) {
  const keys = path.split('.');

  let result = obj;
  for (const key of keys) {
    result = result[key];

    if (result === null) {
      return null;
    }

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}

export default get;
