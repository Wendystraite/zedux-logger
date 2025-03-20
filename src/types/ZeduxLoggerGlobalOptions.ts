import type { DeepRequired } from './DeepRequired.js';

export interface ZeduxLoggerGlobalOptions {
  /**
   * Enable or disable the logger.
   * @default true
   */
  enabled?: boolean;

  /**
   * Options for the graph generated by the logger.
   */
  graphOptions?: {
    /**
     * Show the nodes in the graph by namespaces in the log's details.
     * @default false
     */
    showNodesInGraphByNamespaces?: boolean;

    /**
     * Show the nodes's values in the graph by namespaces in the log's details.
     * @default false
     */
    showNodeValueInGraphByNamespaces?: boolean;

    /**
     * Show the nodes's sources and observers in the graph by namespaces in the log's details.
     * @default false
     */
    showNodeDepsInGraphByNamespaces?: boolean;

    /**
     * Hide in the flattened graph the nodes that are external to the ecosystem like react nodes.
     * @default false
     */
    showExternalNodesInFlatGraph?: boolean;

    /**
     * Hide in the flattened graph signals nodes.
     * @default false
     */
    showSignalsInFlatGraph?: boolean;
  };

  /**
   * Options for debugging the logger.
   */
  debugOptions?: {
    /**
     * Log the logger's options.
     * @default false
     */
    logOptions?: boolean;

    /**
     * Checks whenever the graph is consistent after each event.
     * Will log an error if the graph is not consistent.
     * @remarks This is a performance heavy operation recalculating and comparing the graph every event.
     * @default false
     */
    checkIncrementalGraphConsistency?: boolean;

    /**
     * Use the incremental graph in the logger.
     * This is disabled by default for now until it's more stable.
     * @default false
     */
    useIncrementalGraph?: boolean;
  };
}

export type CompleteZeduxLoggerGlobalOptions =
  DeepRequired<ZeduxLoggerGlobalOptions>;
