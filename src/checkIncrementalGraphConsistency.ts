import type { Ecosystem } from '@zedux/react';
import microdiff, { type Difference } from 'microdiff';
import { isDeepEqual } from 'remeda';

import { type Graph, generateGraph } from './generateGraph/generateGraph.js';
import type { CompleteZeduxLoggerOptions } from './types/ZeduxLoggerOptions.js';

export function checkIncrementalGraphConsistency({
  ecosystem,
  options,
  graphRef,
  consistencyCheckTimeoutIdRef,
}: {
  ecosystem: Ecosystem;
  options: CompleteZeduxLoggerOptions;
  graphRef: { current: Graph | undefined };
  consistencyCheckTimeoutIdRef: { current: number | undefined };
}) {
  const {
    debugOptions: { checkIncrementalGraphConsistency, useIncrementalGraph },
  } = options;

  if (!checkIncrementalGraphConsistency || !useIncrementalGraph) {
    return;
  }

  if (consistencyCheckTimeoutIdRef.current !== undefined) {
    clearTimeout(consistencyCheckTimeoutIdRef.current);
  }

  consistencyCheckTimeoutIdRef.current = setTimeout(
    () => {
      consistencyCheckTimeoutIdRef.current = undefined;

      const graph = graphRef.current;

      const expectedGraph = generateGraph({
        ecosystem,
        options,
      });

      checkGraphConsistency({
        type: 'bottomUp',
        expected: expectedGraph?.bottomUp,
        got: graph?.bottomUp,
        options,
      });
      checkGraphConsistency({
        type: 'topDown',
        expected: expectedGraph?.topDown,
        got: graph?.topDown,
        options,
      });
      checkGraphConsistency({
        type: 'flat',
        expected: expectedGraph?.flat,
        got: graph?.flat,
        options,
      });
      checkGraphConsistency({
        type: 'byNamespaces',
        expected: expectedGraph?.byNamespaces,
        got: graph?.byNamespaces,
        options,
      });
    },

    // Only check after some times of no events since ecosystem.viewGraph is not
    // updated immediately and would result in false positives
    100,
  );
}

function checkGraphConsistency({
  type,
  expected,
  got,
  options,
}: {
  type: 'flat' | 'topDown' | 'bottomUp' | 'byNamespaces';
  expected: Record<string, unknown> | undefined;
  got: Record<string, unknown> | undefined;
  options: CompleteZeduxLoggerOptions;
}) {
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
