import type { Graph } from '../generateGraph/generateGraph.js';
import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerGlobalOptions } from '../types/ZeduxLoggerGlobalOptions.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';

export interface LogArgs {
  logSummary: string;
  logSummaryColors: string[];
  details: LogDetail[];

  addLogToSummary(this: void, log: string, ...colors: string[]): void;
  addLogToDetails(this: void, detail: LogDetail): void;

  storage: ZeduxLoggerEcosystemStorage;
  what: WhatHappened;
  globalOptions: CompleteZeduxLoggerGlobalOptions;
  options: CompleteZeduxLoggerLocalOptions;
  graph: Graph | undefined;
  newSnapshot: unknown;
  oldSnapshot: unknown;

  /**
   * Time in milliseconds that the run took to execute between the runStart and runEnd events.
   */
  runExecutionTimeMs: number | undefined;
}

export interface LogDetail {
  emoji?: string;
  log: string;
  colors?: string[];
  subLogs?: Array<LogDetail | false | undefined>;
  groupCollapsedSubLogs?: boolean;
  data?: unknown;
}
