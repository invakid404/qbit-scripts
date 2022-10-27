export const encode = (data: string, encoding: BufferEncoding): string =>
  Buffer.from(data).toString(encoding);
