import type { LogArgs } from './LogArgs.js';

export function addToSummaryTtl(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { eventMap, template },
    options: {
      showInSummary: { showTtl },
      colors,
    },
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
    colors.default,
    colors.ttl,
    colors.default,
  );
}
