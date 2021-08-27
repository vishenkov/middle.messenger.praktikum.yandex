import isObject from './utils/isObject';

function classnames(styles, ...args) {
  return args.reduce((acc, arg) => {
    if (typeof arg === 'string') {
      return [...acc, styles[arg]];
    }

    if (isObject(arg)) {
      const keys = Object.keys(arg).filter((key) => arg[key]).map((key) => styles[key]);

      return [...acc, ...keys];
    }

    return acc;
  }, []).join(' ');
}

export default classnames;
