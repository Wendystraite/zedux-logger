import type { Graph } from '../generateGraph/generateGraph.js';
import type { LogArgs } from './LogArgs.js';

export function logDependencies(
  args: LogArgs & {
    newGraph: Graph | undefined;
    oldGraph: Graph | undefined;
  },
): void {
  const {
    what: { node },
    options,
    newGraph,
    oldGraph,
  } = args;

  if (node === undefined) {
    return;
  }

  const graph = (newGraph ?? oldGraph)?.flat[node.id];

  if (graph === undefined) {
    return;
  }

  options.console.log('🔗 dependencies', graph.dependencies);
  options.console.log('🔗 dependents', graph.dependents);
}
