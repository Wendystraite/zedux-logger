import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosError(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { error },
    options: {
      showInDetails: { showError },
    },
  } = args;

  if (!showError || error === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '❌',
    log: 'error',
    data: error,
  });
}
