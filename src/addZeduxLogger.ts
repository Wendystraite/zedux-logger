import { type Ecosystem } from '@zedux/react';
import { mapToObj } from 'remeda';

import { consoleGroup } from './utils/consoleGroup.js';
import { addAtomNameToLog } from './addToLog/addAtomNameToLog.js';
import { addEcosystemNameToLog } from './addToLog/addEcosystemNameToLog.js';
import { addOperationToLog } from './addToLog/addOperationToLog.js';
import { addStateToLog } from './addToLog/addStateToLog.js';
import { addSummaryEmojiToLog } from './addToLog/addSummaryEmojiToLog.js';
import { addSummaryToLog } from './addToLog/addSummaryToLog.js';
import { addTtlToLog } from './addToLog/addTtlToLog.js';
import { addWaitingForPromisesNodesToLog } from './addToLog/addWaitingForPromisesNodesToLog.js';
import { canLogEvent } from './canLogEvent/canLogEvent.js';
import { type Graph, generateGraph } from './generateGraph/generateGraph.js';
import { generateSnapshot } from './generateSnapshot/generateSnapshot.js';
import { logDependencies } from './log/logDependencies.js';
import { logEcosystem } from './log/logEcosystem.js';
import { logError } from './log/logError.js';
import { logEvent } from './log/logEvent.js';
import { logGraph } from './log/logGraph.js';
import { logNewState } from './log/logNewState.js';
import { logNode } from './log/logNode.js';
import { logObserver } from './log/logObserver.js';
import { logOldState } from './log/logOldState.js';
import { logReasons } from './log/logReasons.js';
import { logSnapshot } from './log/logSnapshot.js';
import { logStateDiffs } from './log/logStateDiffs.js';
import { logWaitingPromises } from './log/logWaitingPromises.js';
import { parseWhatHappened } from './parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerOptions } from './types/ZeduxLoggerOptions.js';
import type { SubscribedTo } from './types/SubscribedTo.js';

export function addZeduxLogger<E extends Ecosystem>(
  ecosystem: E,
  options: ZeduxLoggerOptions,
): E {
  const oldSnapshotRef: { current: unknown } = { current: undefined };
  const oldGraphRef: { current: Graph | undefined } = {
    current: undefined,
  };

  if (!options.enabled) {
    return ecosystem;
  }

  const subscribedTo: SubscribedTo = mapToObj(options.events, (event) => [
    event,
    true,
  ]);

  ecosystem.on((eventMap) => {
    const what = parseWhatHappened(ecosystem, eventMap);

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

    const oldGraph = oldGraphRef.current;
    const newGraph = generateGraph({
      ecosystem,
      eventMap,
      options,
      oldGraphRef,
    });

    let logSummary = '';
    const logSummaryColors: string[] = [];
    const addToLogsArgs = {
      addLogToSummary(log: string, ...colors: string[]): void {
        if (log !== '') {
          logSummary += ' ';
        }
        logSummary += log;
        logSummaryColors.push(...colors);
      },
      what,
      options,
    };

    addSummaryEmojiToLog(addToLogsArgs);
    addEcosystemNameToLog(addToLogsArgs);
    addAtomNameToLog({ atomName: what.atomName })(addToLogsArgs);
    addSummaryToLog(addToLogsArgs);
    addOperationToLog(addToLogsArgs);
    addTtlToLog(addToLogsArgs);
    addStateToLog(addToLogsArgs);
    addAtomNameToLog({
      show: options.showObserver,
      atomName: what.observerAtomName,
    })(addToLogsArgs);
    addWaitingForPromisesNodesToLog(addToLogsArgs);

    consoleGroup(
      options.console,
      'groupCollapsed',
      [logSummary, ...logSummaryColors],
      () => {
        logEvent({ what, options });
        logOldState({ what, options });
        logNewState({ what, options });
        logWaitingPromises({ what, options });
        logStateDiffs({ what, options });
        logReasons({ what, options });
        logError({ what, options });
        logNode({ what, options });
        logObserver({ what, options });
        logDependencies({ what, options, newGraph, oldGraph });
        logEcosystem({ what, options });
        logGraph({ what, options, newGraph, oldGraph });
        logSnapshot({ what, options, oldSnapshot, newSnapshot });
      },
    );
  });

  return ecosystem;
}
