import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';

export function calculateExecutionTime(
  what: WhatHappened,
  storage: ZeduxLoggerEcosystemStorage,
  localOptions: CompleteZeduxLoggerLocalOptions,
): number | undefined {
  if (
    localOptions.showInSummary.showExecutionTime ||
    localOptions.showInDetails.showExecutionTime ||
    localOptions.executionTimeOptions.warnInConsoleIfSlow ||
    localOptions.executionTimeOptions.errorInConsoleIfVerySlow ||
    localOptions.executionTimeOptions.onSlowEvaluation ||
    localOptions.executionTimeOptions.onVerySlowEvaluation
  ) {
    if (what.event?.type === 'runStart') {
      const startTime = performance.now();
      storage.runStartTimeMapping.set(what.event.source, startTime);
    } else if (what.event?.type === 'runEnd') {
      const startTime = storage.runStartTimeMapping.get(what.event.source);
      storage.runStartTimeMapping.delete(what.event.source);
      if (startTime !== undefined) {
        const endTime = performance.now();
        return endTime - startTime;
      }
    }
  }
}
