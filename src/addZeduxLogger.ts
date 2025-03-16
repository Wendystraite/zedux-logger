import { type Cleanup, type Ecosystem } from '@zedux/react';
import { mapToObj } from 'remeda';

import type { LogArgs, LogDetail } from './addToLogs/LogArgs.js';
import { addToDetailsEcosystem } from './addToLogs/addToDetailsEcosystem.js';
import { addToDetailsError } from './addToLogs/addToDetailsError.js';
import { addToDetailsEvent } from './addToLogs/addToDetailsEvent.js';
import { addToDetailsGraph } from './addToLogs/addToDetailsGraph.js';
import { addToDetailsNewState } from './addToLogs/addToDetailsNewState.js';
import { addToDetailsNode } from './addToLogs/addToDetailsNode.js';
import { addToDetailsObserver } from './addToLogs/addToDetailsObserver.js';
import { addToDetailsObservers } from './addToLogs/addToDetailsObservers.js';
import { addToDetailsOldState } from './addToLogs/addToDetailsOldState.js';
import { addToDetailsReasons } from './addToLogs/addToDetailsReasons.js';
import { addToDetailsSnapshot } from './addToLogs/addToDetailsSnapshot.js';
import { addToDetailsSources } from './addToLogs/addToDetailsSources.js';
import { addToDetailsStateDiffs } from './addToLogs/addToDetailsStateDiffs.js';
import { addToDetailsWaitingPromises } from './addToLogs/addToDetailsWaitingPromises.js';
import { addToSummaryAtomName } from './addToLogs/addToSummaryAtomName.js';
import { addToSummaryEcosystemName } from './addToLogs/addToSummaryEcosystemName.js';
import { addToSummaryEmoji } from './addToLogs/addToSummaryEmoji.js';
import { addToSummaryObserverAtomName } from './addToLogs/addToSummaryObserverAtomName.js';
import { addToSummaryOperation } from './addToLogs/addToSummaryOperation.js';
import { addToSummaryStates } from './addToLogs/addToSummaryStates.js';
import { addToSummarySummary } from './addToLogs/addToSummarySummary.js';
import { addToSummaryTtl } from './addToLogs/addToSummaryTtl.js';
import { addToSummaryWaitingPromises } from './addToLogs/addToSummaryWaitingPromises.js';
import { canLogEvent } from './canLogEvent/canLogEvent.js';
import { checkIncrementalGraphConsistency } from './checkIncrementalGraphConsistency.js';
import { type Graph, generateGraph } from './generateGraph/generateGraph.js';
import { generateSnapshot } from './generateSnapshot/generateSnapshot.js';
import { logLogArgs } from './log/logLogArgs.js';
import { parseWhatHappened } from './parseWhatHappened/parseWhatHappened.js';
import type { SubscribedTo } from './types/SubscribedTo.js';
import {
  DEFAULT_ZEDUX_LOGGER_OPTIONS,
  type ZeduxLoggerOptions,
} from './types/ZeduxLoggerOptions.js';
import { updateGraphIncrementally } from './updateGraphIncrementally/updateGraphIncrementally.js';
import { defaults } from './utils/defaults.js';

/**
 * A logger for Zedux that log everything happening in an ecosystem.
 *
 * @param ecosystem ecosystem to attach the logger to
 * @param options options for the logger
 *
 * @example
 * const ecosystem = createEcosystem();
 * addZeduxLogger(ecosystem);
 */
export function addZeduxLogger(
  ecosystem: Ecosystem,
  options?: ZeduxLoggerOptions,
): Cleanup {
  const oldSnapshotRef: { current: unknown } = { current: undefined };
  const graphRef: { current: Graph | undefined } = { current: undefined };
  const consistencyCheckTimeoutIdRef: { current: number | undefined } = {
    current: undefined,
  };

  const completeOptions = defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS, options ?? {});

  if (completeOptions.debugOptions.logOptions) {
    completeOptions.console.log(
      'Zedux Logger options for',
      ecosystem.id,
      ':',
      completeOptions,
    );
  }

  if (!completeOptions.enabled) {
    return () => {
      // noop
    };
  }

  const subscribedTo: SubscribedTo = mapToObj(
    completeOptions.events,
    (event) => [event, true],
  );

  return ecosystem.on((eventMap) => {
    const what = parseWhatHappened(ecosystem, eventMap, completeOptions);

    if (!canLogEvent({ what, options: completeOptions, subscribedTo })) {
      return;
    }

    const oldSnapshot = oldSnapshotRef.current;
    const newSnapshot = generateSnapshot({
      ecosystem,
      eventMap,
      options: completeOptions,
      oldSnapshotRef,
    });

    if (completeOptions.showInDetails.showGraph) {
      if (
        graphRef.current === undefined ||
        !completeOptions.debugOptions.useIncrementalGraph
      ) {
        graphRef.current = generateGraph({
          ecosystem,
          options: completeOptions,
        });
      } else {
        graphRef.current = updateGraphIncrementally(
          eventMap,
          graphRef.current,
          completeOptions.graphOptions,
        );
      }
    }

    const logArgs: LogArgs = {
      logSummary: '',
      logSummaryColors: [],
      details: [],
      addLogToSummary(log: string, ...colors: string[]): void {
        if (log !== '') {
          logArgs.logSummary += ' ';
        }
        logArgs.logSummary += log;
        logArgs.logSummaryColors.push(...colors);
      },
      addLogToDetails(args: LogDetail): void {
        logArgs.details.push(args);
      },
      what,
      options: completeOptions,
      graph: graphRef.current,
      oldSnapshot,
      newSnapshot,
    };

    addToSummaryEmoji(logArgs);
    addToSummaryEcosystemName(logArgs);
    addToSummaryAtomName(logArgs);
    addToSummarySummary(logArgs);
    addToSummaryOperation(logArgs);
    addToSummaryTtl(logArgs);
    addToSummaryStates(logArgs);
    addToSummaryObserverAtomName(logArgs);
    addToSummaryWaitingPromises(logArgs);

    addToDetailsEvent(logArgs);
    addToDetailsOldState(logArgs);
    addToDetailsNewState(logArgs);
    addToDetailsWaitingPromises(logArgs);
    addToDetailsStateDiffs(logArgs);
    addToDetailsReasons(logArgs);
    addToDetailsError(logArgs);
    addToDetailsNode(logArgs);
    addToDetailsObserver(logArgs);
    addToDetailsSources(logArgs);
    addToDetailsObservers(logArgs);
    addToDetailsEcosystem(logArgs);
    addToDetailsGraph(logArgs);
    addToDetailsSnapshot(logArgs);

    logLogArgs(logArgs);

    checkIncrementalGraphConsistency({
      ecosystem,
      options: completeOptions,
      graphRef,
      consistencyCheckTimeoutIdRef,
    });
  });
}
