import type { Ecosystem } from '@zedux/react';
import type { RefObject } from 'react';

import type { EventMap } from '../types/EventMap.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function generateSnapshot(args: {
  ecosystem: Ecosystem;
  eventMap: EventMap;
  options: CompleteZeduxLoggerOptions;
  oldSnapshotRef: RefObject<unknown>;
}): unknown {
  const {
    ecosystem,
    eventMap,
    oldSnapshotRef,
    options: {
      console,
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
      oldSnapshotRef.current = newSnapshot;
    } catch (error) {
      console.warn('Failed to generate snapshot', error);
    }
  }

  return newSnapshot;
}
