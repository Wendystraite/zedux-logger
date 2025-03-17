import type { Ecosystem, EcosystemEvents } from '@zedux/react';

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
import { generateGraph } from './generateGraph/generateGraph.js';
import { generateSnapshot } from './generateSnapshot/generateSnapshot.js';
import { logLogArgs } from './log/logLogArgs.js';
import { parseWhatHappened } from './parseWhatHappened/parseWhatHappened.js';
import { getDefaultZeduxLoggerEcosystemStorage } from './storage/getDefaultZeduxLoggerEcosystemStorage.js';
import { getZeduxLoggerEcosystemStorage } from './storage/getZeduxLoggerEcosystemStorage.js';
import { updateGraphIncrementally } from './updateGraphIncrementally/updateGraphIncrementally.js';

export function makeZeduxLoggerListener(ecosystem: Ecosystem) {
  return function zeduxLoggerListener(
    eventMap: Partial<EcosystemEvents>,
  ): void {
    const {
      consistencyCheckTimeoutIdRef,
      graphRef,
      oldSnapshotRef,
      completeOptions: options,
      subscribedTo,
    } = getZeduxLoggerEcosystemStorage(ecosystem) ??
    getDefaultZeduxLoggerEcosystemStorage();

    const what = parseWhatHappened(ecosystem, eventMap, options);

    if (!canLogEvent({ what, options, subscribedTo })) {
      return;
    }

    const oldSnapshot = oldSnapshotRef.current;
    const newSnapshot = generateSnapshot({
      ecosystem,
      eventMap,
      options,
      oldSnapshotRef,
    });

    if (options.showInDetails.showGraph) {
      if (
        graphRef.current === undefined ||
        !options.debugOptions.useIncrementalGraph
      ) {
        graphRef.current = generateGraph({
          ecosystem,
          options,
        });
      } else {
        graphRef.current = updateGraphIncrementally(
          eventMap,
          graphRef.current,
          options.graphOptions,
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
      options,
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
      options,
      graphRef,
      consistencyCheckTimeoutIdRef,
    });
  };
}
