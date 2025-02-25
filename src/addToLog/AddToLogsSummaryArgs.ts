import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export interface AddToLogsSummaryArgs {
  addLogToSummary(this: void, log: string, ...colors: string[]): void;
  what: WhatHappened;
  options: ZeduxLoggerOptions;
}
