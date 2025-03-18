import type { LogArgs } from '../addToLogs/LogArgs.js';

export function warnExecutionTimeIfSlow(logArgs: LogArgs): void {
  const {
    runExecutionTimeMs,
    options,
    options: {
      executionTimeOptions: {
        slowThresholdMs,
        verySlowThresholdMs,
        warnInConsoleIfSlow,
        errorInConsoleIfVerySlow,
        onSlowEvaluation,
        onVerySlowEvaluation,
      },
    },
  } = logArgs;

  if (runExecutionTimeMs === undefined) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- should exist
  const node = logArgs.what.node!;

  if (runExecutionTimeMs >= verySlowThresholdMs) {
    onVerySlowEvaluation?.(node, runExecutionTimeMs, logArgs);

    if (errorInConsoleIfVerySlow) {
      options.console.error(
        `Zedux Logger: Very slow evaluation of '${node.id}' detected: ${runExecutionTimeMs}ms`,
        logArgs,
      );
    }
  } else if (runExecutionTimeMs >= slowThresholdMs) {
    onSlowEvaluation?.(node, runExecutionTimeMs, logArgs);

    if (warnInConsoleIfSlow) {
      options.console.warn(
        `Zedux Logger: Slow evaluation of '${node.id}' detected: ${runExecutionTimeMs}ms`,
        logArgs,
      );
    }
  }
}
