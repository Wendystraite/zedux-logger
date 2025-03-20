import type { ZeduxLoggerLocalOptions } from './ZeduxLoggerLocalOptions.js';
import type { ZeduxLoggerNodeFilter } from './ZeduxLoggerNodeFilter.js';

export interface ZeduxLoggerFilter {
  include?: ZeduxLoggerNodeFilter[];
  exclude?: ZeduxLoggerNodeFilter[];
  options?: ZeduxLoggerLocalOptions;
}
