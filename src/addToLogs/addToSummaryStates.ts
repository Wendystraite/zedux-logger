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
    options: {
      console,
      showInSummary: { showOldState, showNewState },
    },
  } = args;

  let showState = false;
  if (eventMap.cycle?.newStatus === 'Active') {
    showState = true;
  } else if (eventMap.change !== undefined) {
    showState = true;
  }

  if (showState && showOldState && oldState !== undefined) {
    const oldStateString = stringifyState({
      showStateOption: showOldState,
      state: oldState,
      hasState: hasOldState,
      console,
    });
    if (oldStateString !== undefined) {
      addLogToSummary(
        `%cfrom %c${oldStateString}`,
        ZEDUX_LOGGER_COLORS.default,
        ZEDUX_LOGGER_COLORS.oldState,
      );
    }
  }

  if (showState && showNewState) {
    const newStateString = stringifyState({
      showStateOption: showNewState,
      state: newState,
      hasState: hasNewState,
      console,
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
