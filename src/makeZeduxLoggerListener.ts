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
import { checkIncrementalDataConsistency } from './checkIncrementalDataConsistency.js';
import { calculateExecutionTime } from './executionTime/calculateExecutionTime.js';
import { warnExecutionTimeIfSlow } from './executionTime/warnExecutionTimeIfSlow.js';
import { calculateCanLogEventWithOptions } from './filters/calculateCanLogEventWithOptions.js';
import { generateGraph } from './generateGraph/generateGraph.js';
import { generateSnapshot } from './generateSnapshot/generateSnapshot.js';
import { logLogArgs } from './log/logLogArgs.js';
import { parseWhatHappened } from './parseWhatHappened/parseWhatHappened.js';
import { getZeduxLoggerEcosystemStorage } from './storage/getZeduxLoggerEcosystemStorage.js';
import { updateGraphIncrementally } from './updateGraphIncrementally/updateGraphIncrementally.js';
import { updateSnapshotIncrementally } from './updateSnapshotIncrementally/updateSnapshotIncrementally.js';

export function makeZeduxLoggerListener(ecosystem: Ecosystem) {
  return function zeduxLoggerListener(
    eventMap: Partial<EcosystemEvents>,
  ): void {
    const storage = getZeduxLoggerEcosystemStorage(ecosystem);

    if (storage?.completeMergedOptions.enabled !== true) {
      return;
    }

    const what = parseWhatHappened(ecosystem, eventMap);

    const { canLog, localOptions } = calculateCanLogEventWithOptions(
      what.node,
      storage,
      what,
    );

    if (storage.calculateGraph) {
      if (storage.calculateIncrementalGraph) {
        if (storage.graph === undefined) {
          storage.graph = generateGraph({
            ecosystem,
            calculateBottomUpGraph: storage.calculateBottomUpGraph,
            calculateByNamespacesGraph: storage.calculateByNamespacesGraph,
            calculateFlatGraph: storage.calculateFlatGraph,
            calculateGraph: storage.calculateGraph,
            calculateTopDownGraph: storage.calculateTopDownGraph,
            console: localOptions.console,
            globalGraphOptions: storage.completeGlobalOptions.graphOptions,
          });
        } else {
          storage.graph = updateGraphIncrementally({
            eventMap,
            graph: storage.graph,
            calculateBottomUpGraph: storage.calculateBottomUpGraph,
            calculateByNamespacesGraph: storage.calculateByNamespacesGraph,
            calculateFlatGraph: storage.calculateFlatGraph,
            calculateTopDownGraph: storage.calculateTopDownGraph,
            globalGraphOptions: storage.completeGlobalOptions.graphOptions,
          });
        }
      } else if (canLog) {
        storage.graph = generateGraph({
          ecosystem,
          calculateBottomUpGraph: storage.calculateBottomUpGraph,
          calculateByNamespacesGraph: storage.calculateByNamespacesGraph,
          calculateFlatGraph: storage.calculateFlatGraph,
          calculateGraph: storage.calculateGraph,
          calculateTopDownGraph: storage.calculateTopDownGraph,
          console: localOptions.console,
          globalGraphOptions: storage.completeGlobalOptions.graphOptions,
        });
      }
    }

    const runExecutionTimeMs = calculateExecutionTime(
      what,
      storage,
      localOptions,
    );

    if (storage.calculateSnapshot) {
      if (storage.snapshot === undefined) {
        storage.snapshot = generateSnapshot({ ecosystem });
      } else {
        storage.snapshot = updateSnapshotIncrementally({
          eventMap,
          snapshot: storage.snapshot,
        });
      }
    }

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
      globalOptions: storage.completeGlobalOptions,
      options: localOptions,
      graph: storage.graph,
      snapshot: storage.snapshot,
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

    checkIncrementalDataConsistency({
      ecosystem,
      storage,
    });
  };
}
