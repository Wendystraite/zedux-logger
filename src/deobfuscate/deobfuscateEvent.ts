import {
  type EcosystemEvents,
  type EvaluationReason,
  type EventReceivedEvent,
} from '@zedux/react';

import { deobfuscateNode } from './deobfuscateNode.js';

export type AnyEvents = EcosystemEvents & { eventReceived: EventReceivedEvent };
export type AnyEvent = AnyEvents[keyof AnyEvents];

export function deobfuscateEvent<EVENT extends AnyEvent>(
  original: EVENT,
): EVENT {
  const deobfuscated = { ...original } as AnyEvent;

  (deobfuscated as unknown as Record<'__original', unknown>).__original =
    original;

  if ('source' in deobfuscated && deobfuscated.source !== undefined) {
    deobfuscated.source = deobfuscateNode(deobfuscated.source);
  }

  if ('observer' in deobfuscated) {
    deobfuscated.observer = deobfuscateNode(deobfuscated.observer);
  }

  if ('reasons' in deobfuscated && deobfuscated.reasons !== undefined) {
    deobfuscated.reasons = deobfuscateReasons(deobfuscated.reasons);
  }

  return deobfuscated as EVENT;
}

export function deobfuscateReasons(reasons: EvaluationReason[]) {
  return reasons.map(deobfuscateEvent);
}
