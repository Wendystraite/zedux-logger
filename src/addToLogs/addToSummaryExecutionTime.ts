import type { LogArgs } from './LogArgs.js';

export function addToSummaryExecutionTime(args: LogArgs): void {
  const {
    addLogToSummary,
    runExecutionTimeMs,
    options: {
      showInSummary: { showExecutionTime },
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

  const executionTimeRounded = (
    Math.round(runExecutionTimeMs * 100) / 100
  ).toFixed(2);

  addLogToSummary(
    `%cin %c${executionTimeRounded}ms%c`,
    colors.default,
    executionTimeColor,
    colors.default,
  );
}
