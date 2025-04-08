import type { EcosystemEvents } from '@zedux/react';

export function updateSnapshotIncrementally(args: {
  eventMap: Partial<EcosystemEvents>;
  snapshot: Record<string, unknown>;
}): Record<string, unknown> {
  const {
    eventMap: { cycle, change },
    snapshot,
  } = args;

  if (cycle !== undefined) {
    return handleCycleEvent({ cycle, snapshot });
  } else if (change !== undefined) {
    return handleChangeEvent({ change, snapshot });
  }

  return snapshot;
}

function handleCycleEvent(args: {
  cycle: NonNullable<EcosystemEvents['cycle']>;
  snapshot: Record<string, unknown>;
}): Record<string, unknown> {
  const {
    cycle: { newStatus, source },
    snapshot,
  } = args;

  if (source !== undefined) {
    if (newStatus === 'Active') {
      return { ...snapshot, [source.id]: source.v as unknown };
    } else if (newStatus === 'Destroyed') {
      const { [source.id]: _, ...newSnapshot } = snapshot;
      return newSnapshot;
    }
  }

  return snapshot;
}

function handleChangeEvent(args: {
  change: NonNullable<EcosystemEvents['change']>;
  snapshot: Record<string, unknown>;
}): Record<string, unknown> {
  const {
    change,
    change: { source },
    snapshot,
  } = args;

  if (source !== undefined) {
    return { ...snapshot, [source.id]: change.newState as unknown };
  }

  return snapshot;
}
