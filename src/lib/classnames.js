function classnames(...args) {
  return args.reduce((acc, arg) => {
    if (typeof arg === 'string') {
      return [...acc, arg];
    }

    if (arg && typeof arg === 'object' && Object.prototype.toString.call(arg) === '[object Object]') {
      const keys = Object.keys(arg).filter((key) => arg[key]);

      return [...acc, ...keys];
    }

    return acc;
  }, []).join(' ');
}

export default classnames;
