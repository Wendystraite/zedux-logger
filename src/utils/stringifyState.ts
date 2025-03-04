import { sliceString } from 'remeda';

import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function stringifyState(args: {
  showStateOption: boolean;
  state: unknown;
  hasState: boolean;
  console: CompleteZeduxLoggerOptions['console'];
}): string | undefined {
  const { showStateOption, state, hasState, console } = args;
  let stateString: string | undefined;
  if (showStateOption && hasState) {
    try {
      if (state === undefined) {
        stateString = 'undefined';
      } else {
        stateString = JSON.stringify(state);
      }
    } catch (error: unknown) {
      console.warn('Failed to generate previous state string', error);
      stateString = String(state);
    }
  }
  if (stateString !== undefined && stateString.length > 50) {
    stateString = sliceString(stateString, 0, 50) + '…';
  }
  return stateString;
}
