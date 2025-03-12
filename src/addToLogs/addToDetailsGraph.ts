import type { LogArgs } from './LogArgs.js';

export function addToDetailsGraph(args: LogArgs): void {
  const {
    options: {
      showInDetails: { showGraph },
      graphOptions: {
        showFlatGraph,
        showBottomUpGraph,
        showTopDownGraph,
        groupCollapseGraph,
        showByNamespacesGraph,
      },
    },
    graph,
    addLogToDetails,
  } = args;

  if (
    !showGraph ||
    graph === undefined ||
    (!showFlatGraph &&
      !showBottomUpGraph &&
      !showTopDownGraph &&
      !showByNamespacesGraph)
  ) {
    return;
  }

  addLogToDetails({
    emoji: '📈',
    log: 'graph',
    groupCollapsedSubLogs: groupCollapseGraph,
    subLogs: [
      showByNamespacesGraph && {
        log: 'by-namespaces',
        data: graph.byNamespaces,
      },
      showFlatGraph && {
        log: 'flat',
        data: graph.flat,
      },
      showTopDownGraph && {
        log: 'top-down',
        data: graph.topDown,
      },
      showBottomUpGraph && {
        log: 'bottom-up',
        data: graph.bottomUp,
      },
    ],
  });
}
