import type { Graph } from '../generateGraph/generateGraph.js';
import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export interface LogArgs {
  logSummary: string;
  logSummaryColors: string[];
  details: LogDetail[];

  addLogToSummary(this: void, log: string, ...colors: string[]): void;
  addLogToDetails(this: void, detail: LogDetail): void;

  what: WhatHappened;
  options: CompleteZeduxLoggerOptions;
  newGraph: Graph | undefined;
  oldGraph: Graph | undefined;
  newSnapshot: unknown;
  oldSnapshot: unknown;
}

export interface LogDetail {
  emoji?: string;
  log: string;
  colors?: string[];
  subLogs?: Array<LogDetail | false | undefined>;
  groupCollapsedSubLogs?: boolean;
  data?: unknown;
}
