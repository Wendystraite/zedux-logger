import { consoleGroup } from '../utils/consoleGroup.js';
import type { Graph } from '../generateGraph/generateGraph.js';
import type { LogArgs } from './LogArgs.js';

export function logGraph(
  args: LogArgs & {
    newGraph: Graph | undefined;
    oldGraph: Graph | undefined;
  },
): void {
  const { options, newGraph, oldGraph } = args;

  if (
    !options.showGraph ||
    (oldGraph === undefined && newGraph === undefined)
  ) {
    return;
  }

  consoleGroup(
    console,
    options.groupCollapseGraph ? 'groupCollapsed' : 'group',
    '📈 graph',
    () => {
      if (newGraph !== undefined) {
        consoleGroup(console, 'group', 'new graph', () => {
          if (options.showGraphByNamespaces) {
            options.console.log('by-namespaces', newGraph.byNamespaces);
          }
          options.console.log('flat', newGraph.flat);
          options.console.log('bottom-up', newGraph.bottomUp);
          options.console.log('top-down', newGraph.topDown);
        });
      } else if (oldGraph !== undefined) {
        consoleGroup(console, 'group', 'old graph', () => {
          if (options.showGraphByNamespaces) {
            options.console.log('by-namespaces', oldGraph.byNamespaces);
          }
          options.console.log('flat', oldGraph.flat);
          options.console.log('bottom-up', oldGraph.bottomUp);
          options.console.log('top-down', oldGraph.topDown);
        });
      }
    },
  );
}
