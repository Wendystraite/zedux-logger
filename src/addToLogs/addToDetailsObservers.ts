import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsObservers(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    what: { node },
    options: {
      showInDetails: { showObservers },
    },
  } = args;

  if (!showObservers || node === undefined) {
    return;
  }

  if (node.o.size > 0) {
    return;
  }

  addLogToDetails({
    emoji: '🔗',
    log: 'observers',
    data: node.o,
  });
}
