import isObject from './utils/is-object';

function classnames(
  styles: Record<string, string>,
  ...args: (string | Record<string, boolean>)[]
): string {
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
