import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosGraph(args: LogArgs): void {
  const { options, newGraph, oldGraph, addLogToAdditionalInfos } = args;

  if (
    !options.showGraph ||
    (oldGraph === undefined && newGraph === undefined)
  ) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '📈',
    log: 'graph',
    groupCollapsedSubLogs: options.groupCollapseGraph,
    subLogs: [
      {
        log: 'new graph',
        subLogs: [
          options.showGraphByNamespaces && {
            log: 'by-namespaces',
            data: newGraph?.byNamespaces,
          },
          {
            log: 'flat',
            data: newGraph?.flat,
          },
          {
            log: 'bottom-up',
            data: newGraph?.bottomUp,
          },
          {
            log: 'top-down',
            data: newGraph?.topDown,
          },
        ],
      },
      {
        log: 'old graph',
        subLogs: [
          options.showGraphByNamespaces && {
            log: 'by-namespaces',
            data: oldGraph?.byNamespaces,
          },
          {
            log: 'flat',
            data: oldGraph?.flat,
          },
          {
            log: 'bottom-up',
            data: oldGraph?.bottomUp,
          },
          {
            log: 'top-down',
            data: oldGraph?.topDown,
          },
        ],
      },
    ],
  });
}
