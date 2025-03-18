import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function calculateExecutionTime(
  what: WhatHappened,
  options: CompleteZeduxLoggerOptions,
  runStartTimeMapping: ZeduxLoggerEcosystemStorage['runStartTimeMapping'],
): number | undefined {
  if (
    options.showInSummary.showExecutionTime ||
    options.showInDetails.showExecutionTime ||
    options.executionTimeOptions.warnInConsoleIfSlow ||
    options.executionTimeOptions.errorInConsoleIfVerySlow ||
    options.executionTimeOptions.onSlowEvaluation ||
    options.executionTimeOptions.onVerySlowEvaluation
  ) {
    if (what.event?.type === 'runStart') {
      const startTime = performance.now();
      runStartTimeMapping.set(what.event.source, startTime);
    } else if (what.event?.type === 'runEnd') {
      const startTime = runStartTimeMapping.get(what.event.source);
      runStartTimeMapping.delete(what.event.source);
      if (startTime !== undefined) {
        const endTime = performance.now();
        return endTime - startTime;
      }
    }
  }
}
