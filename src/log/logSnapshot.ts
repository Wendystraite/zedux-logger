import { consoleGroup } from '../utils/consoleGroup.js';
import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function logSnapshot(
  args: LogArgs & { oldSnapshot: unknown; newSnapshot: unknown },
): void {
  const { options, oldSnapshot, newSnapshot } = args;

  if (
    !options.showSnapshot ||
    (oldSnapshot === undefined && newSnapshot === undefined)
  ) {
    return;
  }

  consoleGroup(
    options.console,
    options.groupCollapseSnapshot ? 'groupCollapsed' : 'group',
    '📸 snapshot',
    () => {
      if (oldSnapshot !== undefined) {
        options.console.log(
          '%cold snapshot',
          ZEDUX_LOGGER_COLORS.groupOldSnapshot,
          oldSnapshot,
        );
      }
      if (newSnapshot !== undefined) {
        options.console.log(
          '%cnew snapshot',
          ZEDUX_LOGGER_COLORS.groupNewSnapshot,
          newSnapshot,
        );
      }
    },
  );
}
