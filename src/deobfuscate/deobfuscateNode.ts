import {
  AtomInstance,
  ExternalNode,
  type InternalEvaluationReason,
  type Job,
  Listener,
  MappedSignal,
  SelectorInstance,
  Signal,
  ZeduxNode,
} from '@zedux/react';

import { deobfuscate, deobfuscateAndTransform } from './deobfuscate.js';

const deobfuscatesJob = [
  deobfuscate<Job>('W', 'Weight'),
  deobfuscate<Job>('R', 'needsRecalculation'),
  deobfuscate<Job>('j', 'job'),
  deobfuscateAndTransform<Job, 'T'>('T', 'Type', (type) => {
    return {
      0: 'UpdateStore',
      1: 'InformSubscribers',
      2: 'EvaluateGraphNode',
      3: 'UpdateExternalDependent',
      4: 'RunEffect',
    }[type];
  }),
];

const deobfuscatesZeduxNode = [
  deobfuscate<ZeduxNode>('izn', 'isZeduxNode'),
  deobfuscate<ZeduxNode>('L', 'ListenerNode'),
  deobfuscate<ZeduxNode>('V', 'scopeValues'),
  deobfuscate<ZeduxNode>('c', 'cancelDestruction'),
  deobfuscate<ZeduxNode>('d', 'dehydrate'),
  deobfuscate<ZeduxNode>('e', 'ecosystem'),
  deobfuscate<ZeduxNode>('f', 'filter'),
  deobfuscate<ZeduxNode>('h', 'hydrate'),
  deobfuscate<ZeduxNode>('j', 'job'),
  deobfuscate<ZeduxNode>('l', 'lifecycleStatus'),
  deobfuscate<ZeduxNode>('m', 'maybeDestroy'),
  deobfuscate<ZeduxNode>('o', 'observers'),
  deobfuscate<ZeduxNode>('p', 'params'),
  deobfuscate<ZeduxNode>('r', 'run'),
  deobfuscate<ZeduxNode>('s', 'sources'),
  deobfuscate<ZeduxNode>('t', 'template'),
  deobfuscate<ZeduxNode>('v', 'value'),
  deobfuscateAndTransform<ZeduxNode, 'w'>(
    'w',
    'why',
    (reason: InternalEvaluationReason | undefined) => {
      const deobfuscatedReasons: InternalEvaluationReason[] = [];
      while (reason !== undefined) {
        deobfuscatedReasons.push(deobfuscateInternalEvaluationReason(reason));
        reason = reason.l;
      }
      return deobfuscatedReasons;
    },
  ),
  deobfuscate<ZeduxNode>('wt', 'why tail'),
];

const deobfuscatesExternalNode = [
  deobfuscate<ExternalNode>('i', 'instance'),
  deobfuscate<ExternalNode>('n', 'notify'),
  deobfuscate<ExternalNode>('k', 'killEdge'),
  deobfuscate<ExternalNode>('u', 'updateEdge'),
];

const deobfuscatesListener = [
  deobfuscate<Listener>('C', 'eventCounts'),
  deobfuscate<Listener>('N', 'Notifiers'),
  deobfuscate<Listener>('D', 'DecrementNotifiers'),
  deobfuscate<Listener>('I', 'IncrementNotifiers'),
];

const deobfuscatesSignal = [deobfuscate<Signal>('E', 'EventMap')];

const deobfuscatesAtomInstance = [
  deobfuscate<AtomInstance>('a', 'alteredEdge'),
  deobfuscate<AtomInstance>('H', 'injectedHydration'),
  deobfuscate<AtomInstance>('I', 'Injectors'),
  deobfuscate<AtomInstance>('N', 'NextInjectors'),
  deobfuscate<AtomInstance>('S', 'Signal'),
  deobfuscate<AtomInstance>('i', 'init'),
  deobfuscate<AtomInstance>('x', 'exportsInfusedSetter'),
];

const deobfuscatesMappedSignal = [
  deobfuscate<MappedSignal>('M', 'SignalMap'),
  deobfuscate<MappedSignal>('C', 'ChangeEvents'),
  deobfuscate<MappedSignal>('b', 'bufferedTransactions'),
  deobfuscate<MappedSignal>('I', 'IdsToKeys'),
  deobfuscate<MappedSignal>('N', 'NextState'),
];

export function deobfuscateNode(original: ZeduxNode): ZeduxNode {
  // eslint-disable-next-line @typescript-eslint/no-misused-spread
  const deobfuscated = { ...original } as ZeduxNode;

  (deobfuscated as unknown as Record<'__original', unknown>).__original =
    original;

  // Job
  for (const deobfuscateJob of deobfuscatesJob) {
    deobfuscateJob(deobfuscated);
  }

  // ZeduxNode
  for (const deobfuscateZeduxNode of deobfuscatesZeduxNode) {
    deobfuscateZeduxNode(deobfuscated);
  }

  // ExternalNode
  if (original instanceof ExternalNode) {
    for (const deobfuscateExternalNode of deobfuscatesExternalNode) {
      deobfuscateExternalNode(deobfuscated as ExternalNode);
    }
  }

  // Listener
  if (original instanceof Listener) {
    for (const deobfuscateListener of deobfuscatesListener) {
      deobfuscateListener(deobfuscated as Listener);
    }
  }

  // Signal
  if (original instanceof Signal) {
    for (const deobfuscateSignal of deobfuscatesSignal) {
      deobfuscateSignal(deobfuscated as Signal);
    }
  }

  // AtomInstance
  if (original instanceof AtomInstance) {
    for (const deobfuscateAtomInstance of deobfuscatesAtomInstance) {
      deobfuscateAtomInstance(deobfuscated as AtomInstance);
    }
  }

  // SelectorInstance
  if (original instanceof SelectorInstance) {
    for (const deobfuscateSelectorInstance of deobfuscatesZeduxNode) {
      deobfuscateSelectorInstance(deobfuscated as SelectorInstance);
    }
  }

  // MappedSignal
  if (original instanceof MappedSignal) {
    for (const deobfuscateMappedSignal of deobfuscatesMappedSignal) {
      deobfuscateMappedSignal(deobfuscated as MappedSignal);
    }
  }

  return deobfuscated;
}

const deobfuscatesInternalEvaluationReason = [
  deobfuscate<InternalEvaluationReason>('e', 'eventMap'),
  deobfuscate<InternalEvaluationReason>('f', 'fullEventMap'),
  deobfuscate<InternalEvaluationReason>('l', 'linkedReason'),
  deobfuscate<InternalEvaluationReason>('n', 'newStateOrStatus'),
  deobfuscate<InternalEvaluationReason>('o', 'oldStateOrStatus'),
  deobfuscate<InternalEvaluationReason>('s', 'source'),
  deobfuscate<InternalEvaluationReason>('r', 'reasons'),
  deobfuscate<InternalEvaluationReason>('t', 'type'),
];

function deobfuscateInternalEvaluationReason(
  reason: InternalEvaluationReason,
): InternalEvaluationReason {
  const deobfuscated = { ...reason } as InternalEvaluationReason;
  (deobfuscated as unknown as Record<'__original', unknown>).__original =
    reason;
  for (const deobfuscateInternalEvaluationReason of deobfuscatesInternalEvaluationReason) {
    deobfuscateInternalEvaluationReason(deobfuscated);
  }
  return deobfuscated;
}
