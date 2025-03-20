import type { Ecosystem } from '@zedux/react';
import microdiff, { type Difference } from 'microdiff';
import { isDeepEqual } from 'remeda';

import { generateGraph } from './generateGraph/generateGraph.js';
import type { ZeduxLoggerEcosystemStorage } from './types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from './types/ZeduxLoggerLocalOptions.js';

export function checkIncrementalGraphConsistency(args: {
  ecosystem: Ecosystem;
  storage: ZeduxLoggerEcosystemStorage;
}) {
  const {
    ecosystem,
    storage,
    storage: {
      completeMergedOptions: {
        debugOptions: { checkIncrementalGraphConsistency, useIncrementalGraph },
      },
    },
  } = args;

  if (!checkIncrementalGraphConsistency || !useIncrementalGraph) {
    return;
  }

  if (storage.consistencyCheckTimeoutId !== undefined) {
    clearTimeout(storage.consistencyCheckTimeoutId);
  }

  storage.consistencyCheckTimeoutId = setTimeout(
    () => {
      storage.consistencyCheckTimeoutId = undefined;

      const graph = storage.graph;

      const expectedGraph = generateGraph({
        ecosystem,
        calculateBottomUpGraph: storage.calculateBottomUpGraph,
        calculateByNamespacesGraph: storage.calculateByNamespacesGraph,
        calculateFlatGraph: storage.calculateFlatGraph,
        calculateGraph: storage.calculateGraph,
        calculateTopDownGraph: storage.calculateTopDownGraph,
        console: storage.completeMergedOptions.console,
        globalGraphOptions: storage.completeMergedOptions.graphOptions,
      });

      checkGraphConsistency({
        type: 'bottomUp',
        expected: expectedGraph?.bottomUp,
        got: graph?.bottomUp,
        options: storage.completeMergedOptions,
      });
      checkGraphConsistency({
        type: 'topDown',
        expected: expectedGraph?.topDown,
        got: graph?.topDown,
        options: storage.completeMergedOptions,
      });
      checkGraphConsistency({
        type: 'flat',
        expected: expectedGraph?.flat,
        got: graph?.flat,
        options: storage.completeMergedOptions,
      });
      checkGraphConsistency({
        type: 'byNamespaces',
        expected: expectedGraph?.byNamespaces,
        got: graph?.byNamespaces,
        options: storage.completeMergedOptions,
      });
    },

    // Only check after some times of no events since ecosystem.viewGraph is not
    // updated immediately and would result in false positives
    100,
  );
}

function checkGraphConsistency(args: {
  type: 'flat' | 'topDown' | 'bottomUp' | 'byNamespaces';
  expected: Record<string, unknown> | undefined;
  got: Record<string, unknown> | undefined;
  options: Pick<CompleteZeduxLoggerLocalOptions, 'console'>;
}) {
  const { type, expected, got, options } = args;

  if (
    expected !== undefined &&
    got !== undefined &&
    !isDeepEqual(expected, got)
  ) {
    options.console.warn(`Incremental ${type} graph consistency check failed`, {
      expected,
      got,
      diffs: humanizeDifferences(microdiff(expected, got)),
    });
  }
}

function humanizeDifferences(
  differences: Difference[],
): Array<[string, Partial<Difference>]> {
  return differences.map(({ path, type, ...diff }) => {
    return [`${type} ${path.join('.')}`, diff];
  });
}
