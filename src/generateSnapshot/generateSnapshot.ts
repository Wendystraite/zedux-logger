import type { Ecosystem } from '@zedux/react';
import type { RefObject } from 'react';

import type { EventMap } from '../types/EventMap.js';
import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function generateSnapshot({
  ecosystem,
  eventMap,
  options,
  oldSnapshotRef,
}: {
  ecosystem: Ecosystem;
  eventMap: EventMap;
  options: ZeduxLoggerOptions;
  oldSnapshotRef: RefObject<unknown>;
}): unknown {
  let canDehydrate = false;
  if (options.showSnapshot) {
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
      oldSnapshotRef.current = newSnapshot;
    } catch (error) {
      options.console.warn('Failed to generate snapshot', error);
    }
  }

  return newSnapshot;
}
