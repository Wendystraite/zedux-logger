import microdiff from 'microdiff';
import { isArray, isPlainObject } from 'remeda';

import { consoleGroup } from '../utils/consoleGroup.js';
import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function logStateDiffs(args: LogArgs): void {
  const {
    what: { hasOldState = false, hasNewState = false, oldState, newState },
    options,
  } = args;

  if (
    !options.showStateDiff ||
    !hasOldState ||
    !hasNewState ||
    (!isArray(oldState) && !isPlainObject(oldState)) ||
    (!isArray(newState) && !isPlainObject(newState))
  ) {
    return;
  }

  const diffs = microdiff(oldState, newState);
  if (diffs.length <= 0) {
    options.console.log('🔍 (no diffs)');
  } else {
    consoleGroup(
      options.console,
      options.groupCollapseStateDiff ? 'groupCollapsed' : 'group',
      `🔍 ${diffs.length} diff${diffs.length > 1 ? 's' : ''}`,
      () => {
        for (const { type, path, ...diff } of diffs) {
          const colorsMap: Record<typeof type, string> = {
            CREATE: ZEDUX_LOGGER_COLORS.diffCreate,
            REMOVE: ZEDUX_LOGGER_COLORS.diffRemove,
            CHANGE: ZEDUX_LOGGER_COLORS.diffChange,
          };
          options.console.log(
            `%c${type}%c ${path.join('.')}`,
            colorsMap[type],
            ZEDUX_LOGGER_COLORS.default,
            diff,
          );
        }
      },
    );
  }
}
