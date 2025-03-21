import type { ZeduxNode } from '@zedux/react';

import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import { findLocalLoggerOptionsOfZeduxNode } from './findLocalLoggerOptionsOfZeduxNode.js';

export function calculateCanLogEventWithOptions(
  node: ZeduxNode | undefined,
  storage: ZeduxLoggerEcosystemStorage,
  what: WhatHappened,
): {
  canLog: boolean;
  localOptions: CompleteZeduxLoggerLocalOptions;
} {
  const { filters, completeMergedOptions } = storage;

  let localOptions: CompleteZeduxLoggerLocalOptions = completeMergedOptions;
  let canLog = false;

  if (filters.length <= 0) {
    localOptions = completeMergedOptions;
    canLog = true;
  } else if (node) {
    const nodeOptions = findLocalLoggerOptionsOfZeduxNode(node, filters);
    if (nodeOptions !== undefined) {
      localOptions = nodeOptions;
      canLog = true;
    }
  }

  if (
    what.event?.type !== undefined &&
    !localOptions.eventsToShow[what.event.type]
  ) {
    canLog = false;
  }

  return { canLog, localOptions };
}
