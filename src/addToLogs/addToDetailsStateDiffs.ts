import microdiff from 'microdiff';
import { isArray, isPlainObject } from 'remeda';

import { isCircularObject } from '../utils/isCircularObject.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsStateDiffs(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { hasOldState = false, hasNewState = false, oldState, newState },
    options: {
      oneLineLogs,
      showInDetails: { showStateDiff },
      diffOptions: { groupCollapseStateDiff },
      colors,
    },
  } = args;

  if (
    !showStateDiff ||
    !hasOldState ||
    !hasNewState ||
    (!isArray(oldState) && !isPlainObject(oldState)) ||
    (!isArray(newState) && !isPlainObject(newState))
  ) {
    return;
  }

  if (isCircularObject(oldState) || isCircularObject(newState)) {
    addLogToDetails({
      emoji: '🔍',
      log: '(unknown diffs)',
      data: '[Circular]',
    });
    return;
  }

  const diffs = microdiff(oldState, newState, { cyclesFix: false });

  if (oneLineLogs) {
    if (diffs.length <= 0) {
      addLogToDetails({
        emoji: '🔍',
        log: '(no diffs)',
        data: [],
      });
    } else {
      addLogToDetails({
        emoji: '🔍',
        log: `${diffs.length} diff${diffs.length > 1 ? 's' : ''}`,
        data: diffs.map(({ type, path, ...diff }) => {
          return [`${type} ${path.join('.')}`, diff];
        }),
      });
    }
  } else {
    if (diffs.length <= 0) {
      addLogToDetails({
        emoji: '🔍',
        log: '(no diffs)',
      });
    } else {
      addLogToDetails({
        emoji: '🔍',
        log: `${diffs.length} diff${diffs.length > 1 ? 's' : ''}`,
        groupCollapsedSubLogs: groupCollapseStateDiff,
        subLogs: diffs.map(({ type, path, ...diff }) => {
          const colorsMap: Record<typeof type, string> = {
            CREATE: colors.diffCreate,
            REMOVE: colors.diffRemove,
            CHANGE: colors.diffChange,
          };
          return {
            log: `%c${type}%c ${path.join('.')}`,
            colors: [colorsMap[type], colors.default],
            data: diff,
          };
        }),
      });
    }
  }
}
