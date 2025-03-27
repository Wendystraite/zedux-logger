import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { addToDetailsEcosystem } from './addToDetailsEcosystem.js';
import { addToDetailsError } from './addToDetailsError.js';
import { addToDetailsEvent } from './addToDetailsEvent.js';
import { addToDetailsExecutionTime } from './addToDetailsExecutionTime.js';
import { addToDetailsGraph } from './addToDetailsGraph.js';
import { addToDetailsNewState } from './addToDetailsNewState.js';
import { addToDetailsNode } from './addToDetailsNode.js';
import { addToDetailsObserver } from './addToDetailsObserver.js';
import { addToDetailsObservers } from './addToDetailsObservers.js';
import { addToDetailsOldState } from './addToDetailsOldState.js';
import { addToDetailsReasons } from './addToDetailsReasons.js';
import { addToDetailsSnapshot } from './addToDetailsSnapshot.js';
import { addToDetailsSources } from './addToDetailsSources.js';
import { addToDetailsStateDiffs } from './addToDetailsStateDiffs.js';
import { addToDetailsWaitingPromises } from './addToDetailsWaitingPromises.js';

export function addAllBuiltInLoggersToDetails(
  logArgs: ZeduxLoggerLogArgs,
): void {
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
}
