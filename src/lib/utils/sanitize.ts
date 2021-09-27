function sanitize(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Should be a string');
  }

  return value.replace(/(?:\r\n|\r|\n)/g, ' ');
}

export default sanitize;
