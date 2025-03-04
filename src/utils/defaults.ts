import { isPlainObject, mapValues } from 'remeda';

import type { DeepRequired } from '../types/DeepRequired.js';

export function defaults<T extends object>(
  defaultValues: DeepRequired<T>,
  values: T,
): DeepRequired<T> {
  return mapValues(defaultValues, (defaultValue, key) => {
    const valueAtKey = values[key as string as keyof T];

    if (valueAtKey === undefined) {
      return defaultValue;
    }

    if (isPlainObject(valueAtKey) && isPlainObject(defaultValue)) {
      return defaults(
        defaultValue as DeepRequired<typeof valueAtKey>,
        valueAtKey,
      );
    }

    return valueAtKey;
  }) as DeepRequired<T>;
}
