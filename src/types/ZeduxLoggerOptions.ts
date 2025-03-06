import type * as Zedux from '@zedux/react';

import type { DeepRequired } from './DeepRequired.js';

export const DEFAULT_ZEDUX_LOGGER_OPTIONS: CompleteZeduxLoggerOptions = {
  enabled: true,
  events: [
    'change',
    'cycle',
    'invalidate',
    'promiseChange',
    'error',
    'resetStart',
    'resetEnd',
  ],
  disableLoggingFlag: null,
  console,
  oneLineLogs: false,
  showInSummary: {
    showEmoji: true,
    showEcosystemName: false,
    showAtomName: true,
    showSummary: true,
    showOperation: true,
    showTtl: true,
    showOldState: true,
    showNewState: true,
    showObserverName: true,
    showWaitingPromises: true,
  },
  showInDetails: {
    showEvent: true,
    showOldState: true,
    showNewState: true,
    showWaitingPromises: true,
    showStateDiff: true,
    showReasons: true,
    showError: true,
    showNode: true,
    showObserver: true,
    showDependencies: true,
    showEcosystem: true,
    showGraph: true,
    showSnapshot: true,
  },
  graphOptions: {
    showGraphByNamespaces: true,
    hideExternalNodesFromFlatGraph: true,
    hideSignalsFromFlatGraph: true,
    groupCollapseGraph: true,
  },
  snapshotOptions: {
    groupCollapseSnapshot: true,
  },
  diffOptions: {
    groupCollapseStateDiff: true,
  },
  filters: {
    hideExternalNodesChanges: true,
    hideSignalsChanges: true,
  },
  deobfuscateSingleLetters: {
    event: true,
    node: true,
    reasons: true,
    ecosystem: true,
  },
};

/**
 * Options given to the Zedux logger.
 */
export interface ZeduxLoggerOptions {
  /**
   * Enable or disable the logger.
   * @default true
   */
  enabled?: boolean;

  /**
   * List of Zedux events to log.
   * @default ["change","cycle","invalidate","promiseChange","error","resetStart","resetEnd"]
   */
  events?: Array<Zedux.EcosystemEvents[keyof Zedux.EcosystemEvents]['type']>;

  /**
   * If this flag is present in an atom's flags, logging will be disabled for that atom.
   */
  disableLoggingFlag?: string | null;

  /**
   * Console-like object to use for logging.
   */
  console?: Pick<
    Console,
    'log' | 'warn' | 'group' | 'groupCollapsed' | 'groupEnd'
  >;

  /**
   * Instead of using console.group, use a single console.log per event.
   * Useful for logging to a file, for easier copy-pasting or as a simple preference.
   * @default false
   */
  oneLineLogs?: boolean;

  /**
   * Logs to show in the log's summary.
   * The log summary is the first line of the log.
   */
  showInSummary?: {
    /**
     * Show an emoji representing what happened in the log's summary.
     * @default true
     */
    showEmoji?: boolean;

    /**
     * Show the name of the ecosystem in the log's summary.
     * @default false
     */
    showEcosystemName?: boolean;

    /**
     * Show the name of the node in the log's summary.
     * @default true
     */
    showAtomName?: boolean;

    /**
     * Show a summary of what happened in the log's summary.
     * @default true
     */
    showSummary?: boolean;

    /**
     * Show the event's operation in the log's summary.
     * @default true
     */
    showOperation?: boolean;

    /**
     * Show the time to live in the log's summary.
     * @default true
     */
    showTtl?: boolean;

    /**
     * Show the stringified old state in the log's summary.
     * @default true
     */
    showOldState?: boolean;

    /**
     * Show the stringified new state in the log's summary.
     * @default true
     */
    showNewState?: boolean;

    /**
     * Show the observer's node name in the log's summary.
     *
     * The observer is the related node that caused/is observing the event like
     * a react component's node.
     *
     * @default true
     */
    showObserverName?: boolean;

    /**
     * Show how many promises is this node waiting for in the log's summary.
     * @default true
     */
    showWaitingPromises?: boolean;
  };

  /**
   * Logs to show in the log's details.
   * The log details are inside a console's group that can be expanded.
   */
  showInDetails?: {
    /**
     * Show the event in the log's details.
     *
     * @default true
     */
    showEvent?: boolean;

    /**
     * Show the old state in the log's details.
     * @default true
     */
    showOldState?: boolean;

    /**
     * Show the new state in the log's details.
     * @default true
     */
    showNewState?: boolean;

    /**
     * Show how many promises is this node waiting for in the log's details.
     * @default true
     */
    showWaitingPromises?: boolean;

    /**
     * Show the state diff in the log's details.
     * @default true
     */
    showStateDiff?: boolean;

    /**
     * Show the reasons why the event happened in the log's details.
     * @default true
     */
    showReasons?: boolean;

    /**
     * Show the error in the log's details.
     * @default true
     */
    showError?: boolean;

    /**
     * Show the node in the log's details.
     * @default true
     */
    showNode?: boolean;

    /**
     * Show the observer in the log's details.
     *
     * The observer is the related node that caused/is observing the event like
     * a react component's node.
     *
     * @default true
     */
    showObserver?: boolean;

    /**
     * Show the dependencies of the node in the log's details.
     * @default true
     */
    showDependencies?: boolean;

    /**
     * Show the ecosystem in the log's details.
     * @default true
     */
    showEcosystem?: boolean;

    /**
     * Show the graph in the log's details.
     * @default true
     */
    showGraph?: boolean;

    /**
     * Show a snapshot of the ecosystem's state in the log's details.
     * @default true
     */
    showSnapshot?: boolean;
  };

  /**
   * Options for the graph generated by the logger.
   */
  graphOptions?: {
    /**
     * Show the graph by namespaces in the log's details.
     * @default true
     */
    showGraphByNamespaces?: boolean;

    /**
     * Hide in the flattened graph the nodes that are external to the ecosystem like react nodes.
     * @default true
     */
    hideExternalNodesFromFlatGraph?: boolean;

    /**
     * Hide in the flattened graph signals nodes.
     * @default true
     */
    hideSignalsFromFlatGraph?: boolean;

    /**
     * Collapse the log group in the log's details.
     * @default true
     */
    groupCollapseGraph?: boolean;
  };

  /**
   * Options for the state's snapshot generated by the logger.
   */
  snapshotOptions?: {
    /**
     * Collapse the log group in the log's details.
     * @default true
     */
    groupCollapseSnapshot?: boolean;
  };

  /**
   * Options for the state diff generated by the logger.
   */
  diffOptions?: {
    /**
     * Collapse the log group in the log's details.
     * @default true
     */
    groupCollapseStateDiff?: boolean;
  };

  /**
   * Options to filter some events.
   */
  filters?: {
    /**
     * Hide events related to external nodes like react components.
     * @default true
     */
    hideExternalNodesChanges?: boolean;

    /**
     * Hide events related to signals nodes.
     * @default true
     */
    hideSignalsChanges?: boolean;
  };

  /**
   * Deobfuscate the single letters public apis presents in the zedux objects
   * like the ecosystem or the nodes.
   */
  deobfuscateSingleLetters?: {
    /**
     * Deobfuscate zedux's {@link Zedux.EcosystemEvents}
     * @default true
     */
    event?: boolean;

    /**
     * Deobfuscate zedux's {@link Zedux.GraphNode}
     * @default true
     */
    node?: boolean;

    /**
     * Deobfuscate zedux's {@link Zedux.EvaluationReason}
     * @default true
     */
    reasons?: boolean;

    /**
     * Deobfuscate zedux's {@link Zedux.Ecosystem}
     * @default true
     */
    ecosystem?: boolean;
  };
}

export type CompleteZeduxLoggerOptions = DeepRequired<ZeduxLoggerOptions>;
