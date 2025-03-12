import {
  type AnyAtomTemplate,
  AtomInstance,
  AtomTemplateBase,
  type Ecosystem,
  type EcosystemEvents,
  type EvaluationReason,
  type GraphNode,
} from '@zedux/react';

import {
  type AtomName,
  parseAtomName,
} from '../parseAtomName/parseAtomName.js';
import type { EventMap } from '../types/EventMap.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

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
  options: Pick<CompleteZeduxLoggerOptions, 'colors'>,
): WhatHappened {
  const { colors } = options;

  const w: WhatHappened = {
    eventMap,
    ecosystem,
    ecosystemName: ecosystem.id,
    summary: ['unknown', '❓', colors.unknown],
  };

  if (eventMap.change !== undefined) {
    handleEventChange(eventMap.change, w, colors);
  } else if (eventMap.cycle !== undefined) {
    handleEventCycle(eventMap.cycle, w, colors);
  } else if (eventMap.invalidate !== undefined) {
    handleEventInvalidate(eventMap.invalidate, w, colors);
  } else if (eventMap.promiseChange !== undefined)
    handleEventPromiseChange(eventMap.promiseChange, w, colors);
  if (eventMap.edge !== undefined) {
    handleEventEdge(eventMap.edge, w, colors);
  } else if (eventMap.error !== undefined) {
    handleEventError(eventMap.error, w, colors);
  } else if (eventMap.resetStart !== undefined) {
    handleEventResetStart(eventMap.resetStart, w, colors);
  } else if (eventMap.resetEnd !== undefined) {
    handleEventResetEnd(eventMap.resetEnd, w, colors);
  } else if (eventMap.runStart !== undefined) {
    handleEventRunStart(eventMap.runStart, w, colors);
  } else if (eventMap.runEnd !== undefined) {
    handleEventRunEnd(eventMap.runEnd, w, colors);
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
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { operation, reasons, source } = change;
  const newState = change.newState as unknown;
  const oldState = change.oldState as unknown;
  w.summary = ['changed', '✏️', colors.changed];
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
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { operation, reasons, source, newStatus, oldStatus } = cycle;

  if (newStatus === 'Initializing') {
    w.summary = ['initializing', '⌛', colors.initializing];
  } else if (oldStatus === 'Initializing' && newStatus === 'Active') {
    if (
      source instanceof AtomInstance &&
      source.promise instanceof Promise &&
      source._promiseStatus === 'loading'
    ) {
      w.summary = ['initializing promise', '⌛', colors.initializingPromise];
    } else {
      w.summary = ['initialized', '⚡', colors.initialized];
      if (source !== undefined) {
        w.hasNewState = true;
        w.newState = source.v;
      }
    }
  } else if (newStatus === 'Active') {
    w.summary = ['active', '✅', colors.active];
  } else if (newStatus === 'Stale') {
    w.summary = ['stale', '🕰️', colors.stale];
  } else {
    w.summary = ['destroyed', '💥', colors.destroyed];
  }

  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.event = cycle;
}

function handleEventInvalidate(
  invalidate: NonNullable<EventMap['invalidate']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { operation, reasons, source } = invalidate;
  w.summary = ['invalidate', '🗑️', colors.invalidate];
  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.event = invalidate;
}

function handleEventPromiseChange(
  promiseChange: NonNullable<EventMap['promiseChange']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { operation, reasons, source } = promiseChange;
  const promiseStatus =
    source instanceof AtomInstance ? source._promiseStatus : undefined;
  if (promiseStatus === undefined) {
    w.summary = ['promise changed', '✏️', colors.promiseChange];
  } else if (promiseStatus === 'loading') {
    w.summary = ['promise loading', '⌛', colors.promiseChangeLoading];
  } else if (promiseStatus === 'success') {
    w.summary = ['promise success', '✅', colors.promiseChangeSuccess];
    w.hasNewState = true;
    w.newState = source?.v;
  } else {
    w.summary = ['promise error', '❌', colors.promiseChangeError];
    w.hasNewState = true;
    w.newState = source?.v;
  }
  w.operation = operation;
  w.node = source;
  w.reasons = reasons;
  w.event = promiseChange;
}

function handleEventEdge(
  edge: NonNullable<EventMap['edge']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { source, action, observer } = edge;
  if (action === 'add') {
    w.summary = ['edge added', '📈', colors.edgeCreated];
  } else if (action === 'update') {
    w.summary = ['edge updated', '📈', colors.edgeUpdated];
  } else {
    w.summary = ['edge removed', '📉', colors.edgeRemoved];
  }
  w.node = source;
  w.event = edge;
  w.observer = observer;
}

function handleEventError(
  error: NonNullable<EventMap['error']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { source, error: errorObj } = error;
  w.summary = ['error', '❌', colors.error];
  w.node = source;
  w.event = error;
  w.error = errorObj;
}

function handleEventResetStart(
  resetStart: NonNullable<EventMap['resetStart']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { isDestroy } = resetStart;
  if (isDestroy) {
    w.summary = ['destroying ecosystem', '🧹', colors.ecosystemDestroyStart];
  } else {
    w.summary = ['resetting ecosystem', '🧹', colors.ecosystemResetStart];
  }
  w.event = resetStart;
}

function handleEventResetEnd(
  resetEnd: NonNullable<EventMap['resetEnd']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { isDestroy } = resetEnd;
  if (isDestroy) {
    w.summary = ['ecosystem destroyed', '🧹', colors.ecosystemDestroyEnd];
  } else {
    w.summary = ['ecosystem reset', '🧹', colors.ecosystemResetEnd];
  }
  w.event = resetEnd;
}

function handleEventRunStart(
  runStart: NonNullable<EventMap['runStart']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { source } = runStart;
  w.summary = ['evaluating', '⚙️', colors.evaluating];
  w.node = source;
  w.event = runStart;
}

function handleEventRunEnd(
  runEnd: NonNullable<EventMap['runEnd']>,
  w: WhatHappened,
  colors: CompleteZeduxLoggerOptions['colors'],
) {
  const { source } = runEnd;
  w.summary = ['evaluated', '⚙️', colors.evaluated];
  w.node = source;
  w.event = runEnd;
}
