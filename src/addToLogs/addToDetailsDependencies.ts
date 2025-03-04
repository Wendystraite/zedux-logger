import type { LogArgs } from './LogArgs.js';

export function addToDetailsDependencies(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { node },
    newGraph,
    oldGraph,
    options: {
      showInDetails: { showDependencies },
    },
  } = args;

  if (!showDependencies || node === undefined) {
    return;
  }

  const graph = (newGraph ?? oldGraph)?.flat[node.id];

  if (graph === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '🔗',
    log: 'dependencies',
    data: graph.dependencies,
  });
}
