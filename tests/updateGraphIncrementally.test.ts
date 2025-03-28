import {
  type Cleanup,
  type Ecosystem,
  type EcosystemEvents,
  api,
  atom,
  createEcosystem,
  injectAtomValue,
  injectEcosystem,
  injectSignal,
} from '@zedux/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS } from '../src/consts/default-zedux-logger-global-options';
import { type Graph, generateGraph } from '../src/generateGraph/generateGraph';
import { updateGraphIncrementally } from '../src/updateGraphIncrementally/updateGraphIncrementally';
import { defaults } from '../src/utils/defaults';

describe.each([
  {
    showExternalNodesInFlatGraph: true,
    showSignalsInFlatGraph: true,
    description: 'with all nodes visible',
  },
  {
    showExternalNodesInFlatGraph: false,
    showSignalsInFlatGraph: true,
    description: 'with external nodes hidden',
  },
  {
    showExternalNodesInFlatGraph: true,
    showSignalsInFlatGraph: false,
    description: 'with signals hidden',
  },
  {
    showExternalNodesInFlatGraph: false,
    showSignalsInFlatGraph: false,
    description: 'with both external nodes and signals hidden',
  },
])('updateGraphIncrementally $description', (testGraphOptions) => {
  const completeGlobalGraphOptions = defaults(
    DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS.graphOptions,
    testGraphOptions,
  );

  let ecosystem: Ecosystem;
  let graph: Graph;
  let events: Array<Partial<EcosystemEvents>>;
  let cleanup: Cleanup;
  beforeEach(() => {
    ecosystem = createEcosystem();
    graph = { flat: {}, topDown: {}, bottomUp: {}, byNamespaces: {} };
    events = [];
    cleanup = ecosystem.on((eventMap: Partial<EcosystemEvents>) => {
      // const { type, event } = pipe(
      //   eventMap,
      //   entries(),
      //   find(([, event]) => isNonNullish(event)),
      //   when((event) => isNonNullish(event), {
      //     onTrue: ([type, event]) => ({ type, event }),
      //     onFalse: () => ({ type: 'unknown' as const, event: undefined }),
      //   }),
      // );

      // if (eventMap.cycle !== undefined || eventMap.edge !== undefined) {
      //   console.log('');
      //   const typeDetail = eventMap.cycle
      //     ? `cycle ${eventMap.cycle.newStatus}`
      //     : eventMap.edge
      //       ? `edge ${eventMap.edge.action}`
      //       : type;
      //   console.log('---', typeDetail, '---');

      //   if (event && Object.hasOwn(event, 'source')) {
      //     const source = (event as CycleEvent).source;
      //     if (source) {
      //       console.log(
      //         'source',
      //         `"${source.id}"`,
      //         'observers',
      //         Array.from(source.o.keys()).map((node) => node.id),
      //         'sources',
      //         Array.from(source.s.keys()).map((node) => node.id),
      //       );
      //     }
      //   }
      //   if (event && Object.hasOwn(event, 'observer')) {
      //     const observer = (event as EdgeEvent).observer as
      //       | GraphNode
      //       | undefined;
      //     if (observer) {
      //       console.log(
      //         'observer',
      //         `"${observer.id}"`,
      //         'observers',
      //         Array.from(observer.o.keys()).map((node) => node.id),
      //         'sources',
      //         Array.from(observer.s.keys()).map((node) => node.id),
      //       );
      //     }
      //   }

      //   console.log(
      //     'EXPECTED BY NS =',
      //     generateGraph({
      //       ecosystem,
      //       oldGraphRef: { current: undefined },
      //       options: defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS, {
      //         graphOptions: options,
      //       }),
      //     })?.byNamespaces,
      //   );
      // }

      events.push(eventMap);
      graph = updateGraphIncrementally({
        eventMap,
        graph,
        calculateBottomUpGraph: true,
        calculateByNamespacesGraph: true,
        calculateFlatGraph: true,
        calculateTopDownGraph: true,
        globalGraphOptions: completeGlobalGraphOptions,
      });

      // if (eventMap.cycle !== undefined || eventMap.edge !== undefined) {
      //   console.log('GOT BY NS      =', graph.byNamespaces);
      //   if (
      //     !isDeepEqual(
      //       graph.byNamespaces,
      //       generateGraph({
      //         ecosystem,
      //         oldGraphRef: { current: undefined },
      //         options: defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS, {
      //           graphOptions: options,
      //         }),
      //       })?.byNamespaces,
      //     )
      //   ) {
      //     console.log('❌ NOT EQUAL');
      //   } else {
      //     console.log('✅ EQUAL');
      //   }
      // }
    });
  });

  afterEach(() => {
    cleanup();
    ecosystem.reset();
  });

  function expectGraphEqualsToEcosystemGraph() {
    const generated = generateGraph({
      ecosystem,
      globalGraphOptions: completeGlobalGraphOptions,
      console,
      calculateBottomUpGraph: true,
      calculateByNamespacesGraph: true,
      calculateFlatGraph: true,
      calculateGraph: true,
      calculateTopDownGraph: true,
    });

    expect(graph.flat).toEqual(generated?.flat);
    expect(graph.topDown).toEqual(generated?.topDown);
    expect(graph.bottomUp).toEqual(generated?.bottomUp);
    expect(graph.byNamespaces).toEqual(generated?.byNamespaces);
  }

  it('should return the graph unchanged if no edge event is provided', () => {
    const graph: Graph = {
      flat: {},
      topDown: {},
      bottomUp: {},
      byNamespaces: {},
    };
    const eventMap: Partial<EcosystemEvents> = {};
    const result = updateGraphIncrementally({
      eventMap,
      graph,
      calculateBottomUpGraph: true,
      calculateByNamespacesGraph: true,
      calculateFlatGraph: true,
      calculateTopDownGraph: true,
      globalGraphOptions: completeGlobalGraphOptions,
    });
    expect(result).toBe(graph);
  });

  it('should handle adding a single simple atom correctly', () => {
    ecosystem.get(atom('@atom/one', 1));

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/one' } } },
      { runEnd: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active', source: { id: '@atom/one' } } },
    ]);
    expectGraphEqualsToEcosystemGraph();
  });

  it('should handle adding multiple simple atoms correctly', () => {
    ecosystem.get(atom('@atom/one', 1));
    ecosystem.get(atom('@atom/two', 1));

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/one' } } },
      { runEnd: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active', source: { id: '@atom/one' } } },
      { runStart: { source: { id: '@atom/two' } } },
      { runEnd: { source: { id: '@atom/two' } } },
      { cycle: { newStatus: 'Active', source: { id: '@atom/two' } } },
    ]);
    expect(graph.flat).toEqual({
      '@atom/one': {
        sources: [],
        observers: [],
        weight: 1,
      },
      '@atom/two': {
        sources: [],
        observers: [],
        weight: 1,
      },
    });
    expectGraphEqualsToEcosystemGraph();
  });

  it('should handle adding an atom with a signal correctly', () => {
    ecosystem.get(
      atom('@atom/one', () => {
        const signal = injectSignal(0);
        return signal;
      }),
    );

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active' } }, // signal
      { edge: {} }, // signal
      { runEnd: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active', source: { id: '@atom/one' } } },
    ]);
    expectGraphEqualsToEcosystemGraph();
  });

  it('should handle removing a simple atom', () => {
    const instance = ecosystem.getNode(atom('@atom/one', 0));
    instance.destroy();

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/one' } } },
      { runEnd: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active', source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Destroyed', source: { id: '@atom/one' } } },
    ]);
    expectGraphEqualsToEcosystemGraph();
  });

  it('should handle removing an atom with a signal', () => {
    const instance = ecosystem.getNode(
      atom('@atom/one', () => {
        const signal = injectSignal(0);
        return signal;
      }),
    );
    instance.destroy();

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active' } }, // signal
      { edge: { action: 'add' } }, // signal
      { runEnd: { source: { id: '@atom/one' } } },
      { cycle: { newStatus: 'Active', source: { id: '@atom/one' } } },
      { edge: { action: 'remove', observer: { id: '@atom/one' } } }, // signal
      { cycle: { newStatus: 'Destroyed' } }, // signal
      { cycle: { newStatus: 'Destroyed', source: { id: '@atom/one' } } },
    ]);
    expectGraphEqualsToEcosystemGraph();
  });

  it('should handle removing a simple atom', () => {
    const oneAtom = atom('@atom/one', 0);
    const threeAtom = atom('@atom/three', 0);
    const twoAtom = atom('@atom/two', () => {
      const oneAsDep = injectSignal(false);
      if (oneAsDep.get()) {
        injectAtomValue(oneAtom);
      } else {
        injectAtomValue(threeAtom);
      }
      return api().setExports({
        setOneAsDep() {
          oneAsDep.set(true);
        },
        setThreeAsDep() {
          oneAsDep.set(true);
        },
      });
    });

    ecosystem.getNode(oneAtom);
    const twoInstance = ecosystem.getNode(twoAtom);
    twoInstance.exports.setOneAsDep();

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/one' } } },
      { runEnd: { source: { id: '@atom/one' } } },
      { cycle: { source: { id: '@atom/one' } } },
      { runStart: { source: { id: '@atom/two' } } },
      { cycle: { source: {} } }, // signal
      { runStart: { source: { id: '@atom/three' } } },
      { runEnd: { source: { id: '@atom/three' } } },
      { cycle: { source: { id: '@atom/three' } } },
      { edge: { action: 'add', source: {} } }, // signal
      { edge: { action: 'add', source: { id: '@atom/three' } } },
      { runEnd: { source: { id: '@atom/two' } } },
      { cycle: { source: { id: '@atom/two' } } },
      { change: { source: {} } }, // signal
      { runStart: { source: { id: '@atom/two' } } },
      {
        edge: {
          action: 'remove',
          source: { id: '@atom/three' },
          observer: { id: '@atom/two' },
        },
      },
      { cycle: { source: { id: '@atom/three' } } },
      { edge: { action: 'add', source: { id: '@atom/one' } } },
      { runEnd: { source: { id: '@atom/two' } } },
    ]);
    expectGraphEqualsToEcosystemGraph();
  });

  it('should handle updating an atom', () => {
    let isDynamic = true;
    const atom1 = atom('@atom/atom1', 1);
    const changingAtom = atom('@atom/changing', () => {
      const { get, getNode } = injectEcosystem();
      return isDynamic ? get(atom1) : getNode(atom1).getOnce();
    });

    const changingNode = ecosystem.getNode(changingAtom);

    isDynamic = false;
    changingNode.invalidate();

    expect(events).toMatchObject([
      { runStart: { source: { id: '@atom/changing' } } },
      { runStart: { source: { id: '@atom/atom1' } } },
      { runEnd: { source: { id: '@atom/atom1' } } },
      { cycle: { source: { id: '@atom/atom1' } } },
      {
        edge: {
          source: { id: '@atom/atom1' },
          observer: { id: '@atom/changing' },
          action: 'add',
        },
      },
      { runEnd: { source: { id: '@atom/changing' } } },
      { cycle: { source: { id: '@atom/changing' } } },
      { invalidate: { source: { id: '@atom/changing' } } },
      { runStart: { source: { id: '@atom/changing' } } },
      {
        edge: {
          source: { id: '@atom/atom1' },
          observer: { id: '@atom/changing' },
          action: 'update',
        },
      },
      { runEnd: { source: { id: '@atom/changing' } } },
    ]);
    expectGraphEqualsToEcosystemGraph();
  });
});
