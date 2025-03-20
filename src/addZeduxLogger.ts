import { type Cleanup, type Ecosystem } from '@zedux/react';

import { makeZeduxLoggerListener } from './makeZeduxLoggerListener.js';
import { getDefaultZeduxLoggerEcosystemStorage } from './storage/getDefaultZeduxLoggerEcosystemStorage.js';
import { setZeduxLoggerEcosystemStorage } from './storage/setZeduxLoggerEcosystemStorage.js';
import { type ZeduxLoggerOptions } from './types/ZeduxLoggerOptions.js';

/**
 * A logger for Zedux that log everything happening in an ecosystem.
 *
 * @param ecosystem ecosystem to attach the logger to
 * @param options options for the logger
 *
 * @example
 * const ecosystem = createEcosystem();
 * addZeduxLogger(ecosystem);
 */
export function addZeduxLogger(
  ecosystem: Ecosystem,
  options?: ZeduxLoggerOptions,
): Cleanup {
  const storage = getDefaultZeduxLoggerEcosystemStorage(options);
  setZeduxLoggerEcosystemStorage(ecosystem, storage);

  if (storage.completeMergedOptions.debugOptions.logOptions) {
    storage.completeMergedOptions.console.log(
      'Zedux Logger options for',
      ecosystem.id,
      ':',
      storage.completeMergedOptions,
    );
  }

  if (!storage.completeMergedOptions.enabled) {
    return () => {
      // noop
    };
  }

  const cleanupListener = ecosystem.on(makeZeduxLoggerListener(ecosystem));

  const cleanup = () => {
    cleanupListener();
    setZeduxLoggerEcosystemStorage(ecosystem, undefined);
  };

  return cleanup;
}
