import {
  AtomInstance,
  ExternalNode,
  type GraphNode,
  type InternalEvaluationReason,
  type Job,
  MappedSignal,
  SelectorInstance,
  Signal,
} from '@zedux/react';
import { map, pipe, piped, when } from 'remeda';

import { deobfuscate, deobfuscateAndTransform } from './deobfuscate.js';

export function deobfuscateNode(node: GraphNode): GraphNode {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    { ...node } as GraphNode,

    (deobfuscated) => {
      (deobfuscated as unknown as Record<'__original', unknown>).__original =
        node;
      return deobfuscated;
    },

    // Job
    piped(
      (node) => node as Job,
      deobfuscate('W', 'Weight'),
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
      (node) => node as GraphNode,
    ),

    // GraphNode
    piped(
      deobfuscate('izn', 'isZeduxNode'),
      deobfuscate('L', 'ListenerNode'),
      deobfuscate('V', 'scopeValues'),
      deobfuscate('c', 'cancelDestruction'),
      deobfuscate('d', 'dehydrate'),
    ),
    piped(
      deobfuscate('e', 'ecosystem'),
      deobfuscate('f', 'filter'),
      deobfuscate('h', 'hydrate'),
      deobfuscate('l', 'lifecycleStatus'),
      deobfuscate('m', 'maybeDestroy'),
    ),
    piped(
      deobfuscate('o', 'observers'),
      deobfuscate('p', 'params'),
      deobfuscate('r', 'run'),
      deobfuscate('s', 'sources'),
      deobfuscate('t', 'template'),
      deobfuscate('v', 'value'),
      deobfuscateAndTransform(
        'w',
        'why',
        map(deobfuscateInternalEvaluationReason),
      ),
    ),

    // ExternalNode
    when(
      (node) => node instanceof ExternalNode,
      (node) => {
        return pipe(
          node,
          deobfuscate('n', 'notify'),
          deobfuscate('i', 'instance'),
          deobfuscate('k', 'killEdge'),
          deobfuscate('u', 'updateEdge'),
          (node) => node as GraphNode,
        );
      },
    ),

    // Listener
    when(
      // "Listener" is not exported
      (node: unknown): node is Record<string, unknown> =>
        node instanceof ExternalNode && 'C' in node,
      (node) => {
        return pipe(
          node,
          deobfuscate('C', 'eventCounts'),
          deobfuscate('N', 'Notifiers'),
          deobfuscate('D', 'DecrementNotifiers'),
          deobfuscate('I', 'IncrementNotifiers'),
          (node) => node as unknown as GraphNode,
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
          (node) => node as GraphNode,
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
          deobfuscate('I', 'Injectors'),
          deobfuscate('N', 'NextInjectors'),
          deobfuscate('S', 'Signal'),
          deobfuscate('i', 'init'),
          (node) => node as GraphNode,
        );
      },
    ),

    // SelectorInstance
    when(
      (node) => node instanceof SelectorInstance,
      (node) => {
        return pipe(node, (node) => node as GraphNode);
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
          (node) => node as GraphNode,
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
    deobfuscate('n', 'newStateOrStatus'),
    deobfuscate('o', 'oldStateOrStatus'),
    deobfuscate('s', 'source'),
    deobfuscate('r', 'reasons'),
    deobfuscate('t', 'type'),
  );
}
