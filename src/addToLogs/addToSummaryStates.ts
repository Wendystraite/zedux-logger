import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import { stringifyState } from '../utils/stringifyState.js';
import type { LogArgs } from './LogArgs.js';

export function addToSummaryStates(args: LogArgs): void {
  const {
    addLogToSummary,
    what: {
      eventMap,
      oldState,
      newState,
      hasOldState = false,
      hasNewState = false,
    },
    options,
  } = args;

  let showState = false;
  if (eventMap.cycle?.newStatus === 'Active') {
    showState = true;
  } else if (eventMap.change !== undefined) {
    showState = true;
  }

  if (showState && options.showOldState && oldState !== undefined) {
    const oldStateString = stringifyState({
      showStateOption: options.showOldState,
      state: oldState,
      hasState: hasOldState,
      options,
    });
    if (oldStateString !== undefined) {
      addLogToSummary(
        `%cfrom %c${oldStateString}`,
        ZEDUX_LOGGER_COLORS.default,
        ZEDUX_LOGGER_COLORS.oldState,
      );
    }
  }

  if (showState && options.showNewState) {
    const newStateString = stringifyState({
      showStateOption: options.showNewState,
      state: newState,
      hasState: hasNewState,
      options,
    });
    if (newStateString !== undefined) {
      addLogToSummary(
        `%cto %c${newStateString}`,
        ZEDUX_LOGGER_COLORS.default,
        ZEDUX_LOGGER_COLORS.newState,
      );
    }
  }
}
