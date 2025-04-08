import {
  type AnyAtomTemplate,
  AtomInstance,
  AtomTemplateBase,
  type Ecosystem,
  type EcosystemEvents,
  type EvaluationReason,
  type ZeduxNode,
} from '@zedux/react';

import { getParsedNodeIdGroupNames } from '../parseAtomId/parseNodeGroupNames.js';
import { type ParsedNodeId, parseNodeId } from '../parseAtomId/parseNodeId.js';
import type { EventMap } from '../types/EventMap.js';
import type { ZeduxLoggerColors } from '../types/ZeduxLoggerColors.js';

export interface WhatHappened {
  eventMap: EventMap;

  ecosystem: Ecosystem;
  ecosystemName: string | undefined;

  summaryWhat: string;
  summaryEmoji: string;
  getSummaryColor(this: void, colors: ZeduxLoggerColors): string;

  operation?: string;

  nodeId?: string;
  nodeIdParsed?: ParsedNodeId;
  nodeIdGroupNames?: string[];

  node?: ZeduxNode;
  observer?: ZeduxNode;
  observerId?: string;
  observerIdParsed?: ParsedNodeId;
  observerIdGroupNames?: string[];
  template?: AnyAtomTemplate;
  tags?: string[];

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
    summaryWhat: 'unknown',
    summaryEmoji: '❓',
    getSummaryColor: (colors) => colors.unknown,
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
    w.nodeId = w.node.id;
    w.nodeIdParsed = parseNodeId(w.nodeId);
    w.nodeIdGroupNames = getParsedNodeIdGroupNames(w.nodeIdParsed);
  }

  if (w.observer?.id !== undefined) {
    w.observerId = w.observer.id;
    w.observerIdParsed = parseNodeId(w.observerId);
    w.observerIdGroupNames = getParsedNodeIdGroupNames(w.observerIdParsed);
  }

  if (w.node?.template instanceof AtomTemplateBase) {
    w.template = w.node.template;
  }

  if (w.template !== undefined) {
    w.tags = w.template.tags;
  }

  return w;
}

function handleEventChange(
  change: NonNullable<EventMap['change']>,
  w: WhatHappened,
) {
  const { operation, reasons, source } = change;
  const newState = change.newState as unknown;
  const oldState = change.oldState as unknown;
  w.summaryWhat = 'changed';
  w.summaryEmoji = '✏️';
  w.getSummaryColor = (colors) => colors.changed;
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
    w.summaryWhat = 'initializing';
    w.summaryEmoji = '⌛';
    w.getSummaryColor = (colors) => colors.initializing;
  } else if (oldStatus === 'Initializing' && newStatus === 'Active') {
    if (
      source instanceof AtomInstance &&
      source.promise instanceof Promise &&
      source.promiseStatus === 'loading'
    ) {
      w.summaryWhat = 'initializing promise';
      w.summaryEmoji = '⌛';
      w.getSummaryColor = (colors) => colors.initializingPromise;
    } else {
      w.summaryWhat = 'initialized';
      w.summaryEmoji = '⚡';
      w.getSummaryColor = (colors) => colors.initialized;
      if (source !== undefined) {
        w.hasNewState = true;
        w.newState = source.v;
      }
    }
  } else if (newStatus === 'Active') {
    w.summaryWhat = 'active';
    w.summaryEmoji = '✅';
    w.getSummaryColor = (colors) => colors.active;
  } else if (newStatus === 'Stale') {
    w.summaryWhat = 'stale';
    w.summaryEmoji = '🕰️';
    w.getSummaryColor = (colors) => colors.stale;
  } else {
    w.summaryWhat = 'destroyed';
    w.summaryEmoji = '💥';
    w.getSummaryColor = (colors) => colors.destroyed;
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
  w.summaryWhat = 'invalidate';
  w.summaryEmoji = '🗑️';
  w.getSummaryColor = (colors) => colors.invalidate;
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
    source instanceof AtomInstance ? source.promiseStatus : undefined;
  if (promiseStatus === undefined) {
    w.summaryWhat = 'promise changed';
    w.summaryEmoji = '✏️';
    w.getSummaryColor = (colors) => colors.promiseChange;
  } else if (promiseStatus === 'loading') {
    w.summaryWhat = 'promise loading';
    w.summaryEmoji = '⌛';
    w.getSummaryColor = (colors) => colors.promiseChangeLoading;
  } else if (promiseStatus === 'success') {
    w.summaryWhat = 'promise success';
    w.summaryEmoji = '✅';
    w.getSummaryColor = (colors) => colors.promiseChangeSuccess;
    w.hasNewState = true;
    w.newState = source?.v;
  } else {
    w.summaryWhat = 'promise error';
    w.summaryEmoji = '❌';
    w.getSummaryColor = (colors) => colors.promiseChangeError;
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
    w.summaryWhat = 'edge added';
    w.summaryEmoji = '📈';
    w.getSummaryColor = (colors) => colors.edgeCreated;
  } else if (action === 'update') {
    w.summaryWhat = 'edge updated';
    w.summaryEmoji = '📈';
    w.getSummaryColor = (colors) => colors.edgeUpdated;
  } else {
    w.summaryWhat = 'edge removed';
    w.summaryEmoji = '📉';
    w.getSummaryColor = (colors) => colors.edgeRemoved;
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
  w.summaryWhat = 'error';
  w.summaryEmoji = '❌';
  w.getSummaryColor = (colors) => colors.error;
  w.node = source;
  w.event = error;
  w.error = errorObj;
}

function handleEventResetStart(
  resetStart: NonNullable<EventMap['resetStart']>,
  w: WhatHappened,
) {
  w.summaryWhat = 'resetting ecosystem';
  w.summaryEmoji = '🧹';
  w.getSummaryColor = (colors) => colors.ecosystemResetStart;
  w.event = resetStart;
}

function handleEventResetEnd(
  resetEnd: NonNullable<EventMap['resetEnd']>,
  w: WhatHappened,
) {
  w.summaryWhat = 'ecosystem reset';
  w.summaryEmoji = '🧹';
  w.getSummaryColor = (colors) => colors.ecosystemResetEnd;
  w.event = resetEnd;
}

function handleEventRunStart(
  runStart: NonNullable<EventMap['runStart']>,
  w: WhatHappened,
) {
  const { source } = runStart;
  w.summaryWhat = 'evaluating';
  w.summaryEmoji = '⚙️';
  w.getSummaryColor = (colors) => colors.evaluating;
  w.node = source;
  w.event = runStart;
}

function handleEventRunEnd(
  runEnd: NonNullable<EventMap['runEnd']>,
  w: WhatHappened,
) {
  const { source } = runEnd;
  w.summaryWhat = 'evaluated';
  w.summaryEmoji = '⚙️';
  w.getSummaryColor = (colors) => colors.evaluated;
  w.node = source;
  w.event = runEnd;
}
