import type { CompleteZeduxLoggerMergedOptions } from '../types/ZeduxLoggerMergedOptions.js';
import { DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS } from './default-zedux-logger-global-options.js';
import { DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS } from './default-zedux-logger-local-options.js';

export const DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS: CompleteZeduxLoggerMergedOptions =
  {
    ...DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS,
    ...DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS,
    graphOptions: {
      ...DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS.graphOptions,
      ...DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.graphOptions,
    },
  };
