import type { DeepRequired } from './DeepRequired.js';
import type { ZeduxLoggerGlobalOptions } from './ZeduxLoggerGlobalOptions.js';
import type { ZeduxLoggerLocalOptions } from './ZeduxLoggerLocalOptions.js';

export type ZeduxLoggerMergedOptions = ZeduxLoggerGlobalOptions &
  ZeduxLoggerLocalOptions;

export type CompleteZeduxLoggerMergedOptions =
  DeepRequired<ZeduxLoggerMergedOptions>;
