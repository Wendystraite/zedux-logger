import type { LogArgs } from './LogArgs.js';

export function addToDetailsGraph(args: LogArgs): void {
  const {
    options: {
      showInDetails: { showGraph },
      graphOptions: { groupCollapseGraph, showGraphByNamespaces },
    },
    newGraph,
    oldGraph,
    addLogToDetails,
  } = args;

  if (!showGraph || (oldGraph === undefined && newGraph === undefined)) {
    return;
  }

  addLogToDetails({
    emoji: '📈',
    log: 'graph',
    groupCollapsedSubLogs: groupCollapseGraph,
    subLogs: [
      newGraph !== undefined && {
        log: 'new graph',
        subLogs: [
          showGraphByNamespaces && {
            log: 'by-namespaces',
            data: newGraph.byNamespaces,
          },
          {
            log: 'flat',
            data: newGraph.flat,
          },
          {
            log: 'bottom-up',
            data: newGraph.bottomUp,
          },
          {
            log: 'top-down',
            data: newGraph.topDown,
          },
        ],
      },
      oldGraph !== undefined && {
        log: 'old graph',
        subLogs: [
          showGraphByNamespaces && {
            log: 'by-namespaces',
            data: oldGraph.byNamespaces,
          },
          {
            log: 'flat',
            data: oldGraph.flat,
          },
          {
            log: 'bottom-up',
            data: oldGraph.bottomUp,
          },
          {
            log: 'top-down',
            data: oldGraph.topDown,
          },
        ],
      },
    ],
  });
}
