import type { LogArgs } from './LogArgs.js';

export function addToDetailsSources(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { node },
    options: {
      showInDetails: { showSources },
    },
  } = args;

  if (!showSources || node === undefined) {
    return;
  }

  if (node.s.size > 0) {
    return;
  }

  addLogToDetails({
    emoji: '🔗',
    log: 'sources',
    data: node.s,
  });
}
