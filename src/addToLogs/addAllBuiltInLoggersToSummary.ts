import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { addToSummaryAtomName } from './addToSummaryAtomName.js';
import { addToSummaryEcosystemName } from './addToSummaryEcosystemName.js';
import { addToSummaryEmoji } from './addToSummaryEmoji.js';
import { addToSummaryExecutionTime } from './addToSummaryExecutionTime.js';
import { addToSummaryObserverAtomName } from './addToSummaryObserverAtomName.js';
import { addToSummaryOperation } from './addToSummaryOperation.js';
import { addToSummaryStates } from './addToSummaryStates.js';
import { addToSummarySummary } from './addToSummarySummary.js';
import { addToSummaryTtl } from './addToSummaryTtl.js';
import { addToSummaryWaitingPromises } from './addToSummaryWaitingPromises.js';

export function addAllBuiltInLoggersToSummary(
  logArgs: ZeduxLoggerLogArgs,
): void {
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
}
