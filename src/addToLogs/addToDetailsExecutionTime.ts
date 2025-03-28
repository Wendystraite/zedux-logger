import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsExecutionTime(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    runExecutionTimeMs,
    options: {
      showInDetails: { showExecutionTime },
      colors,
      executionTimeOptions: { slowThresholdMs, verySlowThresholdMs },
    },
  } = args;

  if (!showExecutionTime || runExecutionTimeMs === undefined) {
    return;
  }

  let executionTimeColor = colors.executionTimeNormal;
  if (runExecutionTimeMs >= verySlowThresholdMs) {
    executionTimeColor = colors.executionTimeVerySlow;
  } else if (runExecutionTimeMs >= slowThresholdMs) {
    executionTimeColor = colors.executionTimeSlow;
  }

  addLogToDetails({
    emoji: '⏱️',
    log: '%cExecution time',
    colors: [executionTimeColor],
    data: `${runExecutionTimeMs}ms`,
  });
}
