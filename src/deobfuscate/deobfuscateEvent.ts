import {
  type EcosystemEvents,
  type EvaluationReason,
  type EventReceivedEvent,
} from '@zedux/react';
import { pipe, when } from 'remeda';

import { deobfuscateNode } from './deobfuscateNode.js';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyEvents = EcosystemEvents & { eventReceived: EventReceivedEvent };
export type AnyEvent = AnyEvents[keyof AnyEvents];

type EventWithSource = {
  [K in keyof AnyEvents]: AnyEvents[K] extends Partial<Record<'source', any>>
    ? AnyEvents[K]
    : never;
}[keyof AnyEvents];

type EventWithObserver = {
  [K in keyof AnyEvents]: AnyEvents[K] extends Partial<Record<'observer', any>>
    ? AnyEvents[K]
    : never;
}[keyof AnyEvents];

type EventWithReasons = {
  [K in keyof AnyEvents]: AnyEvents[K] extends Partial<Record<'reasons', any>>
    ? AnyEvents[K]
    : never;
}[keyof AnyEvents];

export function deobfuscateEvent<EVENT extends AnyEvent>(event: EVENT): EVENT {
  const original = event;
  return pipe(
    { ...event } as AnyEvent,

    (deobfuscated) => {
      (deobfuscated as unknown as Record<'__original', unknown>).__original =
        original;
      return deobfuscated;
    },

    when(
      (event): event is EventWithSource => 'source' in event,
      (event) => {
        if (event.source !== undefined) {
          event.source = deobfuscateNode(event.source);
        }
        return event as AnyEvent;
      },
    ),
    when(
      (event): event is EventWithObserver => 'observer' in event,
      (event) => {
        event.observer = deobfuscateNode(event.observer);
        return event as AnyEvent;
      },
    ),
    when(
      (event): event is EventWithReasons => 'reasons' in event,
      (event) => {
        if (event.reasons !== undefined) {
          event.reasons = deobfuscateReasons(event.reasons);
        }
        return event as AnyEvent;
      },
    ),
  ) as EVENT;
}

export function deobfuscateReasons(reasons: EvaluationReason[]) {
  return reasons.map(deobfuscateEvent);
}
