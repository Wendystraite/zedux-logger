import { sliceString } from 'remeda';

import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';

export function stringifyState(args: {
  showStateOption: boolean;
  state: unknown;
  hasState: boolean;
  console: CompleteZeduxLoggerLocalOptions['console'];
  maxLength: number;
}): string | undefined {
  const { showStateOption, state, hasState, console, maxLength } = args;
  let stateString: string | undefined;
  if (showStateOption && hasState) {
    try {
      if (state === undefined) {
        stateString = 'undefined';
      } else {
        stateString = JSON.stringify(state);
      }
    } catch (error: unknown) {
      if (error instanceof TypeError && error.message.includes('circular')) {
        stateString = '[Circular]';
      } else {
        console.warn('Failed to generate previous state string', error);
        stateString = String(state);
      }
    }
  }
  if (
    maxLength > 0 &&
    stateString !== undefined &&
    stateString.length > maxLength
  ) {
    stateString = sliceString(stateString, 0, maxLength) + '…';
  }
  return stateString;
}
