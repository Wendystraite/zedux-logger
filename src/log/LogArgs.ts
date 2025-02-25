import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export interface LogArgs {
  what: WhatHappened;
  options: ZeduxLoggerOptions;
}
