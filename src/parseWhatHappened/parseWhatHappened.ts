import {
  type AnyAtomTemplate,
  AtomInstance,
  AtomTemplateBase,
  type Ecosystem,
  type EcosystemEvents,
  type EvaluationReason,
  type GraphNode,
} from '@zedux/react';

import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import {
  type AtomName,
  parseAtomName,
} from '../parseAtomName/parseAtomName.js';
import type { EventMap } from '../types/EventMap.js';

export interface WhatHappened {
  eventMap: EventMap;

  ecosystem: Ecosystem;
  ecosystemName: string;

  summary: [what: string, emoji: string, color: string];

  operation?: string;

  atomName?: AtomName;

  node?: GraphNode;
  observer?: GraphNode;
  observerAtomName?: AtomName;
  template?: AnyAtomTemplate;
  flags?: string[];

  waitingForPromisesNodes?: GraphNode[];

  reasons?: EvaluationReason[];

  oldState?: unknown;
  hasOldState?: boolean;
  newState?: unknown;
  hasNewState?: boolean;

  error?: Error;

  event?: EcosystemEvents[keyof EcosystemEvents];
}

export function parseWhatHappened(
  ecosystem: Ecosystem,
  eventMap: EventMap,
): WhatHappened {
  const w: WhatHappened = {
    eventMap,
    ecosystem,
    ecosystemName: ecosystem.id,
    summary: ['unknown', '❓', ZEDUX_LOGGER_COLORS.unknown],
  };

  if (eventMap.change !== undefined) {
    handleEventChange(eventMap.change, w);
  } else if (eventMap.cycle !== undefined) {
    handleEventCycle(eventMap.cycle, w);
  } else if (eventMap.invalidate !== undefined) {
    handleEventInvalidate(eventMap.invalidate, w);
  } else if (eventMap.promiseChange !== undefined)
    handleEventPromiseChange(eventMap.promiseChange, w);
  if (eventMap.edge !== undefined) {
    handleEventEdge(eventMap.edge, w);
  } else if (eventMap.error !== undefined) {
    handleEventError(eventMap.error, w);
  } else if (eventMap.resetStart !== undefined) {
    handleEventResetStart(eventMap.resetStart, w);
  } else if (eventMap.resetEnd !== undefined) {
    handleEventResetEnd(eventMap.resetEnd, w);
  } else if (eventMap.runStart !== undefined) {
    handleEventRunStart(eventMap.runStart, w);
  } else if (eventMap.runEnd !== undefined) {
    handleEventRunEnd(eventMap.runEnd, w);
  }

  if (w.hasNewState === false && w.node !== undefined) {
    w.hasNewState = true;
    w.newState = w.node.getOnce();
  }

  if (w.node !== undefined) {
    w.atomName = parseAtomName(w.node.id);
  }

  if (w.observer?.id !== undefined) {
    w.observerAtomName = parseAtomName(w.observer.id);
  }

  if (w.node?.template instanceof AtomTemplateBase) {
    w.template = w.node.template;
  }

  if (w.template !== undefined) {
    w.flags = w.template.flags;
  }

  if (w.node !== undefined) {
    w.waitingForPromisesNodes = getWaitingForNodes({
      node: w.node,
      skipNode: true,
    });
  }

  return w;
}

function getWaitingForNodes({
  node,
  skipNode,
}: {
  node: GraphNode;
  skipNode: boolean;
}): GraphNode[] {
  const waitingNodes: GraphNode[] = [];
  if (!skipNode) {
    if (node instanceof AtomInstance && node._promiseStatus === 'loading') {
      waitingNodes.push(node);
    }
  }
  for (const source of node.s.keys()) {
    waitingNodes.push(...getWaitingForNodes({ node: source, skipNode: false }));
  }
  return waitingNodes;
}

function handleEventChange(
  change: NonNullable<EventMap['change']>,
  w: WhatHappened,
) {
  const { operation, reasons, source } = change;
  const newState = change.newState as unknown;
  const oldState = change.oldState as unknown;
  w.summary = ['changed', '✏️', ZEDUX_LOGGER_COLORS.changed];
  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.hasNewState = true;
  w.newState = newState;
  w.hasOldState = true;
  w.oldState = oldState;
  w.event = change;
}

function handleEventCycle(
  cycle: NonNullable<EventMap['cycle']>,
  w: WhatHappened,
) {
  const { operation, reasons, source, newStatus, oldStatus } = cycle;

  if (newStatus === 'Initializing') {
    w.summary = ['initializing', '⌛', ZEDUX_LOGGER_COLORS.initializing];
  } else if (oldStatus === 'Initializing' && newStatus === 'Active') {
    if (
      source instanceof AtomInstance &&
      source.promise instanceof Promise &&
      source._promiseStatus === 'loading'
    ) {
      w.summary = [
        'initializing promise',
        '⌛',
        ZEDUX_LOGGER_COLORS.initializing,
      ];
    } else {
      w.summary = ['initialized', '⚡', ZEDUX_LOGGER_COLORS.initialized];
      if (source !== undefined) {
        w.hasNewState = true;
        w.newState = source.v;
      }
    }
  } else if (newStatus === 'Active') {
    w.summary = ['active', '✅', ZEDUX_LOGGER_COLORS.active];
  } else if (newStatus === 'Stale') {
    w.summary = ['stale', '🕰️', ZEDUX_LOGGER_COLORS.stale];
  } else {
    w.summary = ['destroyed', '💥', ZEDUX_LOGGER_COLORS.destroyed];
  }

  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.event = cycle;
}

function handleEventInvalidate(
  invalidate: NonNullable<EventMap['invalidate']>,
  w: WhatHappened,
) {
  const { operation, reasons, source } = invalidate;
  w.summary = ['invalidate', '🗑️', ZEDUX_LOGGER_COLORS.invalidate];
  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.event = invalidate;
}

function handleEventPromiseChange(
  promiseChange: NonNullable<EventMap['promiseChange']>,
  w: WhatHappened,
) {
  const { operation, reasons, source } = promiseChange;
  const promiseStatus =
    source instanceof AtomInstance ? source._promiseStatus : undefined;
  if (promiseStatus === undefined) {
    w.summary = ['promise changed', '✏️', ZEDUX_LOGGER_COLORS.promiseChange];
  } else if (promiseStatus === 'loading') {
    w.summary = [
      'promise loading',
      '⌛',
      ZEDUX_LOGGER_COLORS.promiseChangeLoading,
    ];
  } else if (promiseStatus === 'success') {
    w.summary = [
      'promise success',
      '✅',
      ZEDUX_LOGGER_COLORS.promiseChangeSuccess,
    ];
    w.hasNewState = true;
    w.newState = source?.v;
  } else {
    w.summary = ['promise error', '❌', ZEDUX_LOGGER_COLORS.promiseChangeError];
    w.hasNewState = true;
    w.newState = source?.v;
  }
  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.event = promiseChange;
}

function handleEventEdge(edge: NonNullable<EventMap['edge']>, w: WhatHappened) {
  const { source, action, observer } = edge;
  if (action === 'add') {
    w.summary = ['edge added', '📈', ZEDUX_LOGGER_COLORS.edgeCreated];
  } else if (action === 'update') {
    w.summary = ['edge updated', '📈', ZEDUX_LOGGER_COLORS.edgeUpdated];
  } else {
    w.summary = ['edge removed', '📉', ZEDUX_LOGGER_COLORS.edgeRemoved];
  }
  w.node = source;
  w.event = edge;
  w.observer = observer;
}

function handleEventError(
  error: NonNullable<EventMap['error']>,
  w: WhatHappened,
) {
  const { source, error: errorObj } = error;
  w.summary = ['error', '❌', ZEDUX_LOGGER_COLORS.error];
  w.node = source;
  w.event = error;
  w.error = errorObj;
}

function handleEventResetStart(
  resetStart: NonNullable<EventMap['resetStart']>,
  w: WhatHappened,
) {
  const { isDestroy } = resetStart;
  if (isDestroy) {
    w.summary = [
      'destroying ecosystem',
      '🧹',
      ZEDUX_LOGGER_COLORS.ecosystemDestroyStart,
    ];
  } else {
    w.summary = [
      'resetting ecosystem',
      '🧹',
      ZEDUX_LOGGER_COLORS.ecosystemResetStart,
    ];
  }
  w.event = resetStart;
}

function handleEventResetEnd(
  resetEnd: NonNullable<EventMap['resetEnd']>,
  w: WhatHappened,
) {
  const { isDestroy } = resetEnd;
  if (isDestroy) {
    w.summary = [
      'ecosystem destroyed',
      '🧹',
      ZEDUX_LOGGER_COLORS.ecosystemDestroyEnd,
    ];
  } else {
    w.summary = [
      'ecosystem reset',
      '🧹',
      ZEDUX_LOGGER_COLORS.ecosystemResetEnd,
    ];
  }
  w.event = resetEnd;
}

function handleEventRunStart(
  runStart: NonNullable<EventMap['runStart']>,
  w: WhatHappened,
) {
  const { source } = runStart;
  w.summary = ['evaluating', '⚙️', ZEDUX_LOGGER_COLORS.evaluating];
  w.node = source;
  w.event = runStart;
}

function handleEventRunEnd(
  runEnd: NonNullable<EventMap['runEnd']>,
  w: WhatHappened,
) {
  const { source } = runEnd;
  w.summary = ['evaluated', '⚙️', ZEDUX_LOGGER_COLORS.evaluated];
  w.node = source;
  w.event = runEnd;
}
