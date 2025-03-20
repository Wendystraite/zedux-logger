import type { ZeduxLoggerFilter } from './ZeduxLoggerFilter.js';
import type { ZeduxLoggerMergedOptions } from './ZeduxLoggerMergedOptions.js';

/**
 * Options given to the Zedux logger.
 */
export interface ZeduxLoggerOptions {
  /**
   * Global options for the Zedux logger.
   * Theses options are shared between all the Zedux loggers.
   */
  options?: ZeduxLoggerMergedOptions;

  /**
   * Filters to apply to the logger.
   * Each filter can include or exclude nodes based on their name, type, template, or tag.
   * If a node matches an include filter, it will be logged.
   * If a node matches an exclude filter, it will not be logged.
   * If a node matches both an include and an exclude filter, it will not be logged.
   * If a node doesn't match any filter, it will be logged.
   */
  filters?: ZeduxLoggerFilter[];
}
