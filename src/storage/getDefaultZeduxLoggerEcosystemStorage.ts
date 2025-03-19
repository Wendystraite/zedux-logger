import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import {
  DEFAULT_ZEDUX_LOGGER_OPTIONS,
  type ZeduxLoggerOptions,
} from '../types/ZeduxLoggerOptions.js';
import { defaults } from '../utils/defaults.js';

export function getDefaultZeduxLoggerEcosystemStorage(
  options?: ZeduxLoggerOptions,
): ZeduxLoggerEcosystemStorage {
  const completeOptions = defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS, options ?? {});
  return {
    oldSnapshotRef: { current: undefined },
    graphRef: { current: undefined },
    consistencyCheckTimeoutIdRef: { current: undefined },
    originalOptions: options,
    completeOptions,
    runStartTimeMapping: new Map(),
  };
}
