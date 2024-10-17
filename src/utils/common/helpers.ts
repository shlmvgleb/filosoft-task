import { HttpException } from '@nestjs/common';

export const formatString = (str: string, ...args: any) => {
  let matches = -1;
  return str.replace(/\?\?/g, () => {
    matches += 1;
    return args[matches] || '';
  });
};

export async function findOrThrow<T>(
  getter: () => Promise<T>,
  exception: HttpException,
): Promise<T> {
  let res;

  try {
    res = await getter();
  } catch (e) {
    throw exception;
  }

  if (!res) {
    throw exception;
  }

  return res;
}
