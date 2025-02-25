import { sliceString } from 'remeda';

import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function stringifyState(args: {
  showStateOption: boolean;
  state: unknown;
  hasState: boolean;
  options: ZeduxLoggerOptions;
}): string | undefined {
  const { showStateOption, state, hasState, options } = args;
  let stateString: string | undefined;
  if (showStateOption && hasState) {
    try {
      if (state === undefined) {
        stateString = 'undefined';
      } else {
        stateString = JSON.stringify(state);
      }
    } catch (error: unknown) {
      options.console.warn('Failed to generate previous state string', error);
      stateString = String(state);
    }
  }
  if (stateString !== undefined && stateString.length > 50) {
    stateString = sliceString(stateString, 0, 50) + '…';
  }
  return stateString;
}
