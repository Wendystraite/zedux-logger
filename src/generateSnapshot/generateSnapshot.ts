import type { Ecosystem } from '@zedux/react';

import type { EventMap } from '../types/EventMap.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';

export function generateSnapshot(args: {
  ecosystem: Ecosystem;
  eventMap: EventMap;
  storage: ZeduxLoggerEcosystemStorage;
  localOptions: CompleteZeduxLoggerLocalOptions;
}): unknown {
  const {
    ecosystem,
    eventMap,
    storage,
    localOptions,
    localOptions: {
      showInDetails: { showSnapshot },
    },
  } = args;

  let canDehydrate = false;
  if (showSnapshot) {
    if (eventMap.change !== undefined) {
      canDehydrate = true;
    } else if (
      eventMap.cycle?.oldStatus === 'Initializing' &&
      eventMap.cycle.newStatus === 'Active'
    ) {
      canDehydrate = true;
    } else if (eventMap.cycle?.newStatus === 'Destroyed') {
      canDehydrate = true;
    }
  }

  let newSnapshot: unknown;
  if (canDehydrate) {
    try {
      newSnapshot = ecosystem.dehydrate();
      storage.snapshot = newSnapshot;
    } catch (error) {
      localOptions.console.warn('Failed to generate snapshot', error);
    }
  }

  return newSnapshot;
}
