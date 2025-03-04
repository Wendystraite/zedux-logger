import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosError(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { error },
    options,
  } = args;

  if (!options.showError || error === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '❌',
    log: 'error',
    data: error,
  });
}
