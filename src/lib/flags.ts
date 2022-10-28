import { Flags } from '@oclif/core';
import { parseDuration } from './duration';
import { error } from '@oclif/core/lib/errors';

export const durationFlag = Flags.custom({
  parse: async (value) => {
    const parsedValue = parseDuration(value);
    if (parsedValue === null) {
      error(`invalid duration: "${value}"`, { exit: 1 });
    }

    return parsedValue;
  },
});
