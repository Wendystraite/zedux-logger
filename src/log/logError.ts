import type { LogArgs } from './LogArgs.js';

export function logError(args: LogArgs): void {
  const {
    what: { error },
    options,
  } = args;

  if (!options.showError || error === undefined) {
    return;
  }

  options.console.log('❌ error', error);
}
