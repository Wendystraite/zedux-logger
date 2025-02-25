import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { AddToLogsSummaryArgs } from './AddToLogsSummaryArgs.js';

export function addTtlToLog(args: AddToLogsSummaryArgs): void {
  const {
    addLogToSummary,
    what: { eventMap, template },
    options: { showTtl },
  } = args;

  if (
    !showTtl ||
    eventMap.cycle?.newStatus !== 'Stale' ||
    template?.ttl === undefined
  ) {
    return;
  }

  addLogToSummary(
    `%c(ttl %c${template.ttl}%c)`,
    ZEDUX_LOGGER_COLORS.default,
    ZEDUX_LOGGER_COLORS.ttl,
    ZEDUX_LOGGER_COLORS.default,
  );
}
