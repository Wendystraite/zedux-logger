import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosDependencies(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
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

  addLogToAdditionalInfos({
    emoji: '🔗',
    log: 'dependencies',
    data: graph.dependencies,
  });
}
