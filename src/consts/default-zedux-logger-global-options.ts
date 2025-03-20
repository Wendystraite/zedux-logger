import type { CompleteZeduxLoggerGlobalOptions } from '../types/ZeduxLoggerGlobalOptions.js';

/**
 * Default options for the Zedux logger.
 */
export const DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS: CompleteZeduxLoggerGlobalOptions =
  {
    enabled: true,
    graphOptions: {
      showNodesInGraphByNamespaces: false,
      showNodeValueInGraphByNamespaces: false,
      showNodeDepsInGraphByNamespaces: false,
      showExternalNodesInFlatGraph: false,
      showSignalsInFlatGraph: false,
    },
    debugOptions: {
      logOptions: false,
      checkIncrementalGraphConsistency: false,
      useIncrementalGraph: false,
    },
  };
