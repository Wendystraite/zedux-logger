import type { Graph } from '../generateGraph/generateGraph.js';
import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export interface LogArgs {
  readonly logSummary: string;
  readonly logSummaryColors: string[];
  readonly additionalInfos: AdditionalInfoOrSubLogs[];

  addLogToSummary(this: void, log: string, ...colors: string[]): void;
  addLogToAdditionalInfos(this: void, args: AdditionalInfoOrSubLogs): void;
  what: WhatHappened;
  options: CompleteZeduxLoggerOptions;
  newGraph: Graph | undefined;
  oldGraph: Graph | undefined;
  oldSnapshot: unknown;
  newSnapshot: unknown;
}

export interface AdditionalInfoOrSubLogs {
  emoji?: string;
  log: string;
  colors?: string[];
  subLogs?: Array<AdditionalInfoOrSubLogs | false | undefined>;
  groupCollapsedSubLogs?: boolean;
  data?: unknown;
}
