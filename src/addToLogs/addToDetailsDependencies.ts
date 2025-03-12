import type { LogArgs } from './LogArgs.js';

export function addToDetailsDependencies(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { node },
    graph,
    options: {
      showInDetails: { showDependencies },
    },
  } = args;

  if (!showDependencies || node === undefined) {
    return;
  }

  const dependencies = graph?.flat[node.id]?.dependencies;

  if (dependencies === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '🔗',
    log: 'dependencies',
    data: dependencies,
  });
}
