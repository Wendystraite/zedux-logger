import type { Ecosystem, EcosystemEvents } from '@zedux/react';

import type { LogArgs, LogDetail } from './addToLogs/LogArgs.js';
import { addToDetailsEcosystem } from './addToLogs/addToDetailsEcosystem.js';
import { addToDetailsError } from './addToLogs/addToDetailsError.js';
import { addToDetailsEvent } from './addToLogs/addToDetailsEvent.js';
import { addToDetailsExecutionTime } from './addToLogs/addToDetailsExecutionTime.js';
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
import { addToSummaryExecutionTime } from './addToLogs/addToSummaryExecutionTime.js';
import { addToSummaryObserverAtomName } from './addToLogs/addToSummaryObserverAtomName.js';
import { addToSummaryOperation } from './addToLogs/addToSummaryOperation.js';
import { addToSummaryStates } from './addToLogs/addToSummaryStates.js';
import { addToSummarySummary } from './addToLogs/addToSummarySummary.js';
import { addToSummaryTtl } from './addToLogs/addToSummaryTtl.js';
import { addToSummaryWaitingPromises } from './addToLogs/addToSummaryWaitingPromises.js';
import { canLogEvent } from './canLogEvent/canLogEvent.js';
import { checkIncrementalGraphConsistency } from './checkIncrementalGraphConsistency.js';
import { calculateExecutionTime } from './executionTime/calculateExecutionTime.js';
import { warnExecutionTimeIfSlow } from './executionTime/warnExecutionTimeIfSlow.js';
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
    const storage =
      getZeduxLoggerEcosystemStorage(ecosystem) ??
      getDefaultZeduxLoggerEcosystemStorage();

    const {
      consistencyCheckTimeoutIdRef,
      graphRef,
      oldSnapshotRef,
      completeOptions: options,
      subscribedTo,
      runStartTimeMapping,
    } = storage;

    const what = parseWhatHappened(ecosystem, eventMap, options);

    const canLog = canLogEvent({ what, options, subscribedTo });

    const currentGraph = graphRef.current;

    const doUpdateGraphIncrementally =
      options.showInDetails.showGraph &&
      currentGraph !== undefined &&
      options.debugOptions.useIncrementalGraph;

    const doGenerateNewGraph =
      canLog && options.showInDetails.showGraph && !doUpdateGraphIncrementally;

    if (doUpdateGraphIncrementally) {
      graphRef.current = updateGraphIncrementally(
        eventMap,
        currentGraph,
        options.graphOptions,
      );
    } else if (doGenerateNewGraph) {
      graphRef.current = generateGraph({
        ecosystem,
        options,
      });
    }

    const runExecutionTimeMs = calculateExecutionTime(
      what,
      options,
      runStartTimeMapping,
    );

    const oldSnapshot = oldSnapshotRef.current;
    const newSnapshot = generateSnapshot({
      ecosystem,
      eventMap,
      options,
      oldSnapshotRef,
    });

    const logArgs: LogArgs = {
      logSummary: '',
      logSummaryColors: [],
      details: [],
      addLogToSummary(log: string, ...colors: string[]): void {
        if (logArgs.logSummary.length > 0) {
          logArgs.logSummary += ' ';
        }
        logArgs.logSummary += log;
        logArgs.logSummaryColors.push(...colors);
      },
      addLogToDetails(args: LogDetail): void {
        logArgs.details.push(args);
      },
      storage,
      what,
      options,
      graph: graphRef.current,
      oldSnapshot,
      newSnapshot,
      runExecutionTimeMs,
    };

    if (canLog) {
      addToSummaryEmoji(logArgs);
      addToSummaryEcosystemName(logArgs);
      addToSummaryAtomName(logArgs);
      addToSummarySummary(logArgs);
      addToSummaryOperation(logArgs);
      addToSummaryTtl(logArgs);
      addToSummaryStates(logArgs);
      addToSummaryObserverAtomName(logArgs);
      addToSummaryWaitingPromises(logArgs);
      addToSummaryExecutionTime(logArgs);

      addToDetailsEvent(logArgs);
      addToDetailsOldState(logArgs);
      addToDetailsNewState(logArgs);
      addToDetailsWaitingPromises(logArgs);
      addToDetailsStateDiffs(logArgs);
      addToDetailsReasons(logArgs);
      addToDetailsError(logArgs);
      addToDetailsExecutionTime(logArgs);
      addToDetailsNode(logArgs);
      addToDetailsObserver(logArgs);
      addToDetailsSources(logArgs);
      addToDetailsObservers(logArgs);
      addToDetailsEcosystem(logArgs);
      addToDetailsGraph(logArgs);
      addToDetailsSnapshot(logArgs);

      logLogArgs(logArgs);
    }

    warnExecutionTimeIfSlow(logArgs);

    checkIncrementalGraphConsistency({
      ecosystem,
      options,
      graphRef,
      consistencyCheckTimeoutIdRef,
    });
  };
}
