import { type Ecosystem } from '@zedux/react';
import { mapToObj } from 'remeda';

import type { AdditionalInfoOrSubLogs, LogArgs } from './addToLogs/LogArgs.js';
import { addToAdditionalInfosDependencies } from './addToLogs/addToAdditionalInfosDependencies.js';
import { addToAdditionalInfosEcosystem } from './addToLogs/addToAdditionalInfosEcosystem.js';
import { addToAdditionalInfosError } from './addToLogs/addToAdditionalInfosError.js';
import { addToAdditionalInfosEvent } from './addToLogs/addToAdditionalInfosEvent.js';
import { addToAdditionalInfosGraph } from './addToLogs/addToAdditionalInfosGraph.js';
import { addToAdditionalInfosNewState } from './addToLogs/addToAdditionalInfosNewState.js';
import { addToAdditionalInfosNode } from './addToLogs/addToAdditionalInfosNode.js';
import { addToAdditionalInfosObserver } from './addToLogs/addToAdditionalInfosObserver.js';
import { addToAdditionalInfosOldState } from './addToLogs/addToAdditionalInfosOldState.js';
import { addToAdditionalInfosReasons } from './addToLogs/addToAdditionalInfosReasons.js';
import { addToAdditionalInfosSnapshot } from './addToLogs/addToAdditionalInfosSnapshot.js';
import { addToAdditionalInfosStateDiffs } from './addToLogs/addToAdditionalInfosStateDiffs.js';
import { addToAdditionalInfosWaitingPromises } from './addToLogs/addToAdditionalInfosWaitingPromises.js';
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
  options: ZeduxLoggerOptions,
): E {
  const oldSnapshotRef: { current: unknown } = { current: undefined };
  const oldGraphRef: { current: Graph | undefined } = {
    current: undefined,
  };

  const completeOptions = defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS, options);

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
    const additionalInfos: AdditionalInfoOrSubLogs[] = [];
    const logArgs: LogArgs = {
      logSummary,
      logSummaryColors,
      additionalInfos,
      addLogToSummary(log: string, ...colors: string[]): void {
        if (log !== '') {
          logSummary += ' ';
        }
        logSummary += log;
        logSummaryColors.push(...colors);
      },
      addLogToAdditionalInfos(args: AdditionalInfoOrSubLogs): void {
        additionalInfos.push(args);
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

    addToAdditionalInfosEvent(logArgs);
    addToAdditionalInfosOldState(logArgs);
    addToAdditionalInfosNewState(logArgs);
    addToAdditionalInfosWaitingPromises(logArgs);
    addToAdditionalInfosStateDiffs(logArgs);
    addToAdditionalInfosReasons(logArgs);
    addToAdditionalInfosError(logArgs);
    addToAdditionalInfosNode(logArgs);
    addToAdditionalInfosObserver(logArgs);
    addToAdditionalInfosDependencies(logArgs);
    addToAdditionalInfosEcosystem(logArgs);
    addToAdditionalInfosGraph(logArgs);
    addToAdditionalInfosSnapshot(logArgs);

    logLogArgs(logArgs);
  });

  return ecosystem;
}
