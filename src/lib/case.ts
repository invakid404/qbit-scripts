import _ from 'lodash';
import { ToCamelCase } from './types';

export type ToCamelCaseReturnValue<T> = T extends Array<infer E>
  ? ToCamelCase<E>[]
  : ToCamelCase<T>;

export const toCamelCase = <
  T extends Record<string, unknown> | Record<string, unknown>[],
>(
  value: T,
): ToCamelCaseReturnValue<T> => {
  if (Array.isArray(value)) {
    return value.map((element) =>
      toCamelCase(element),
    ) as ToCamelCaseReturnValue<T>;
  }

  return _.mapKeys(value as unknown as Record<string, unknown>, (_value, key) =>
    _.camelCase(key),
  ) as ToCamelCaseReturnValue<T>;
};
