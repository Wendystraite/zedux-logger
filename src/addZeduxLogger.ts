import { type Cleanup, type Ecosystem } from '@zedux/react';

import { makeZeduxLoggerListener } from './makeZeduxLoggerListener.js';
import { getDefaultZeduxLoggerEcosystemStorage } from './storage/getDefaultZeduxLoggerEcosystemStorage.js';
import { setZeduxLoggerEcosystemStorage } from './storage/setZeduxLoggerEcosystemStorage.js';
import type { ZeduxLoggerBuiltInTemplateKey } from './types/ZeduxLoggerBuiltInTemplateKey.js';
import { type ZeduxLoggerOptions } from './types/ZeduxLoggerOptions.js';
import { zeduxLoggerAtom } from './zeduxLoggerAtom.js';

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
export function addZeduxLogger<
  TEMPLATE_KEY extends string = ZeduxLoggerBuiltInTemplateKey,
>(ecosystem: Ecosystem, options?: ZeduxLoggerOptions<TEMPLATE_KEY>): Cleanup {
  const storage = getDefaultZeduxLoggerEcosystemStorage(options);

  if (storage.completeMergedOptions.debugOptions.logOptions) {
    storage.completeMergedOptions.console.log(
      'Zedux Logger options for',
      ecosystem.id,
      'initialized to',
      storage,
    );
  }

  setZeduxLoggerEcosystemStorage(ecosystem, storage);
  ecosystem.find(zeduxLoggerAtom)?.set(storage);

  const cleanupListener = ecosystem.on(makeZeduxLoggerListener(ecosystem));

  const cleanup = () => {
    cleanupListener();
    setZeduxLoggerEcosystemStorage(ecosystem, undefined);
    ecosystem.find(zeduxLoggerAtom)?.set(undefined);
  };

  return cleanup;
}
