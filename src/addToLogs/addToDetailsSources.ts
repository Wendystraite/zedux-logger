import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsSources(args: ZeduxLoggerLogArgs): void {
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
