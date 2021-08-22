function classnames(...args) {
  return args.reduce((acc, arg) => {
    if (typeof arg === 'string') {
      return [...acc, arg];
    }

    if (arg && typeof arg === 'object') {
      const keys = Object.keys(arg).filter((key) => arg[key]);

      return [...acc, ...keys];
    }

    return acc;
  }, []).join(' ');
}

export default classnames;
