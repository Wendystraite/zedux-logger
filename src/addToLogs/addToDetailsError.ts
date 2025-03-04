import type { LogArgs } from './LogArgs.js';

export function addToDetailsError(args: LogArgs): void {
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
