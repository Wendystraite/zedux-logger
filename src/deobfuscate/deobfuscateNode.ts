import {
  AtomInstance,
  ExternalNode,
  type InternalEvaluationReason,
  type Job,
  Listener,
  MappedSignal,
  SelectorInstance,
  Signal,
  type ZeduxNode,
} from '@zedux/react';
import { pipe, piped, when } from 'remeda';

import { deobfuscate, deobfuscateAndTransform } from './deobfuscate.js';

export function deobfuscateNode(node: ZeduxNode): ZeduxNode {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    { ...node } as ZeduxNode,

    (deobfuscated: ZeduxNode) => {
      (deobfuscated as unknown as Record<'__original', unknown>).__original =
        node;
      return deobfuscated;
    },

    // Job
    piped(
      (node) => node as Job,
      deobfuscate('W', 'Weight'),
      deobfuscate('R', 'needsRecalculation'),
      deobfuscate('j', 'job'),
      deobfuscateAndTransform('T', 'Type', (type) => {
        return {
          0: 'UpdateStore',
          1: 'InformSubscribers',
          2: 'EvaluateGraphNode',
          3: 'UpdateExternalDependent',
          4: 'RunEffect',
        }[type];
      }),
      (node) => node as ZeduxNode,
    ),

    // ZeduxNode
    piped(
      deobfuscate('izn', 'isZeduxNode'),
      deobfuscate('L', 'ListenerNode'),
      deobfuscate('V', 'scopeValues'),
      deobfuscate('c', 'cancelDestruction'),
      deobfuscate('d', 'dehydrate'),
      deobfuscate('e', 'ecosystem'),
    ),
    piped(
      deobfuscate('f', 'filter'),
      deobfuscate('h', 'hydrate'),
      deobfuscate('j', 'job'),
      deobfuscate('l', 'lifecycleStatus'),
      deobfuscate('m', 'maybeDestroy'),
      deobfuscate('o', 'observers'),
      deobfuscate('p', 'params'),
    ),
    piped(
      deobfuscate('r', 'run'),
      deobfuscate('s', 'sources'),
      deobfuscate('t', 'template'),
      deobfuscate('v', 'value'),
      deobfuscateAndTransform(
        'w',
        'why',
        (reason: InternalEvaluationReason | undefined) => {
          const deobfuscatedReasons: InternalEvaluationReason[] = [];
          while (reason !== undefined) {
            deobfuscatedReasons.push(
              deobfuscateInternalEvaluationReason(reason),
            );
            reason = reason.l;
          }
          return deobfuscatedReasons;
        },
      ),
      deobfuscate('wt', 'why tail'),
    ),

    // ExternalNode
    when(
      (node) => node instanceof ExternalNode,
      (node) => {
        return pipe(
          node,
          deobfuscate('i', 'instance'),
          deobfuscate('n', 'notify'),
          deobfuscate('k', 'killEdge'),
          deobfuscate('u', 'updateEdge'),
          (node) => node as ZeduxNode,
        );
      },
    ),

    // Listener
    when(
      (node): node is Listener => node instanceof Listener,
      (node) => {
        return pipe(
          node,
          deobfuscate('C', 'eventCounts'),
          deobfuscate('N', 'Notifiers'),
          deobfuscate('D', 'DecrementNotifiers'),
          deobfuscate('I', 'IncrementNotifiers'),
          (node) => node as ZeduxNode,
        );
      },
    ),

    // Signal
    when(
      (node) => node instanceof Signal,
      (node) => {
        return pipe(
          node,
          deobfuscate('E', 'EventMap'),
          (node) => node as ZeduxNode,
        );
      },
    ),

    // AtomInstance
    when(
      (node) => node instanceof AtomInstance,
      (node) => {
        return pipe(
          node,
          deobfuscate('a', 'alteredEdge'),
          deobfuscate('H', 'injectedHydration'),
          deobfuscate('I', 'Injectors'),
          deobfuscate('N', 'NextInjectors'),
          deobfuscate('S', 'Signal'),
          deobfuscate('i', 'init'),
          deobfuscate('x', 'exportsInfusedSetter'),
          (node) => node as ZeduxNode,
        );
      },
    ),

    // SelectorInstance
    when(
      (node) => node instanceof SelectorInstance,
      (node) => {
        return pipe(node, (node) => node as ZeduxNode);
      },
    ),

    // MappedSignal
    when(
      (node) => node instanceof MappedSignal,
      (node) => {
        return pipe(
          node,
          deobfuscate('M', 'SignalMap'),
          deobfuscate('C', 'ChangeEvents'),
          deobfuscate('b', 'bufferedTransactions'),
          deobfuscate('I', 'IdsToKeys'),
          deobfuscate('N', 'NextState'),
          (node) => node as ZeduxNode,
        );
      },
    ),
  );
}

function deobfuscateInternalEvaluationReason(
  reason: InternalEvaluationReason,
): InternalEvaluationReason {
  return pipe(
    { ...reason } as InternalEvaluationReason,

    (deobfuscated) => {
      (deobfuscated as unknown as Record<'__original', unknown>).__original =
        reason;
      return deobfuscated;
    },

    deobfuscate('e', 'eventMap'),
    deobfuscate('f', 'fullEventMap'),
    deobfuscate('l', 'linkedReason'),
    deobfuscate('n', 'newStateOrStatus'),
    deobfuscate('o', 'oldStateOrStatus'),
    deobfuscate('s', 'source'),
    deobfuscate('r', 'reasons'),
    deobfuscate('t', 'type'),
  );
}
