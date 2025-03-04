import { type Ecosystem } from '@zedux/react';
import { mapToObj } from 'remeda';

import type { LogArgs, LogDetail } from './addToLogs/LogArgs.js';
import { addToDetailsDependencies } from './addToLogs/addToDetailsDependencies.js';
import { addToDetailsEcosystem } from './addToLogs/addToDetailsEcosystem.js';
import { addToDetailsError } from './addToLogs/addToDetailsError.js';
import { addToDetailsEvent } from './addToLogs/addToDetailsEvent.js';
import { addToDetailsGraph } from './addToLogs/addToDetailsGraph.js';
import { addToDetailsNewState } from './addToLogs/addToDetailsNewState.js';
import { addToDetailsNode } from './addToLogs/addToDetailsNode.js';
import { addToDetailsObserver } from './addToLogs/addToDetailsObserver.js';
import { addToDetailsOldState } from './addToLogs/addToDetailsOldState.js';
import { addToDetailsReasons } from './addToLogs/addToDetailsReasons.js';
import { addToDetailsSnapshot } from './addToLogs/addToDetailsSnapshot.js';
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
import { type Graph, generateGraph } from './generateGraph/generateGraph.js';
import { generateSnapshot } from './generateSnapshot/generateSnapshot.js';
import { logLogArgs } from './log/logLogArgs.js';
import { parseWhatHappened } from './parseWhatHappened/parseWhatHappened.js';
import type { SubscribedTo } from './types/SubscribedTo.js';
import {
  DEFAULT_ZEDUX_LOGGER_OPTIONS,
  type ZeduxLoggerOptions,
} from './types/ZeduxLoggerOptions.js';
import { defaults } from './utils/defaults.js';

export function addZeduxLogger<E extends Ecosystem>(
  ecosystem: E,
  options?: ZeduxLoggerOptions,
): E {
  const oldSnapshotRef: { current: unknown } = { current: undefined };
  const oldGraphRef: { current: Graph | undefined } = {
    current: undefined,
  };

  const completeOptions = defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS, options ?? {});

  if (!completeOptions.enabled) {
    return ecosystem;
  }

  const subscribedTo: SubscribedTo = mapToObj(
    completeOptions.events,
    (event) => [event, true],
  );

  ecosystem.on((eventMap) => {
    const what = parseWhatHappened(ecosystem, eventMap);

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

    const oldGraph = oldGraphRef.current;
    const newGraph = generateGraph({
      ecosystem,
      eventMap,
      options: completeOptions,
      oldGraphRef,
    });

    let logSummary = '';
    const logSummaryColors: string[] = [];
    const details: LogDetail[] = [];
    const logArgs: LogArgs = {
      logSummary,
      logSummaryColors,
      details,
      addLogToSummary(log: string, ...colors: string[]): void {
        if (log !== '') {
          logSummary += ' ';
        }
        logSummary += log;
        logSummaryColors.push(...colors);
      },
      addLogToDetails(args: LogDetail): void {
        details.push(args);
      },
      what,
      options: completeOptions,
      oldGraph,
      newGraph,
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
    addToDetailsDependencies(logArgs);
    addToDetailsEcosystem(logArgs);
    addToDetailsGraph(logArgs);
    addToDetailsSnapshot(logArgs);

    logLogArgs(logArgs);
  });

  return ecosystem;
}
