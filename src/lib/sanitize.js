function sanitize(string) {
  if (typeof string !== 'string') {
    throw new Error('Should be a string');
  }

  return string.replace(/(?:\r\n|\r|\n)/g, ' ');
}

export default sanitize;
