import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsError(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    what: { error },
    options: {
      showInDetails: { showError },
    },
  } = args;

  if (!showError || error === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '❌',
    log: 'error',
    data: error,
  });
}
