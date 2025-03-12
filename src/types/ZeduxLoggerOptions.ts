import type * as Zedux from '@zedux/react';

import type { DeepRequired } from './DeepRequired.js';

/**
 * Default options for the Zedux logger.
 */
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
    showTopDownGraph: true,
    showBottomUpGraph: true,
    showFlatGraph: true,
    showByNamespacesGraph: true,
    showNodesInGraphByNamespaces: false,
    showNodeValueInGraphByNamespaces: false,
    showNodeDepsInGraphByNamespaces: false,
    showExternalNodesInFlatGraph: false,
    showSignalsInFlatGraph: false,
    groupCollapseGraph: true,
  },
  snapshotOptions: {
    groupCollapseSnapshot: true,
  },
  diffOptions: {
    groupCollapseStateDiff: true,
  },
  filters: {
    showExternalNodesChanges: false,
    showSignalsChanges: false,
  },
  deobfuscateSingleLetters: {
    event: true,
    node: true,
    reasons: true,
    ecosystem: true,
  },
  debugOptions: {
    logOptions: false,
    checkIncrementalGraphConsistency: false,
    useIncrementalGraph: false,
  },
};

/**
 * All options enabled for the Zedux logger.
 */
export const ALL_ENABLED_ZEDUX_LOGGER_OPTIONS: CompleteZeduxLoggerOptions = {
  enabled: true,
  events: [
    'change',
    'cycle',
    'edge',
    'error',
    'invalidate',
    'promiseChange',
    'resetEnd',
    'resetStart',
    'runEnd',
    'runStart',
  ],
  disableLoggingFlag: null,
  console,
  oneLineLogs: true,
  showInSummary: {
    showEmoji: true,
    showEcosystemName: true,
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
    showTopDownGraph: true,
    showBottomUpGraph: true,
    showFlatGraph: true,
    showByNamespacesGraph: true,
    showNodesInGraphByNamespaces: true,
    showNodeValueInGraphByNamespaces: true,
    showNodeDepsInGraphByNamespaces: true,
    showExternalNodesInFlatGraph: true,
    showSignalsInFlatGraph: true,
    groupCollapseGraph: true,
  },
  snapshotOptions: {
    groupCollapseSnapshot: true,
  },
  diffOptions: {
    groupCollapseStateDiff: true,
  },
  filters: {
    showExternalNodesChanges: true,
    showSignalsChanges: true,
  },
  deobfuscateSingleLetters: {
    event: true,
    node: true,
    reasons: true,
    ecosystem: true,
  },
  debugOptions: {
    logOptions: true,
    checkIncrementalGraphConsistency: true,
    useIncrementalGraph: true,
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
     * Show the flattened graph in the log's details.
     *
     * > An object containing every node in the graph in the top level (no
     * > nesting). Each node has a list of dependency strings and a list of
     * > dependent strings that point to other keys in the top-level object. This
     * > is the only view that shows pseudo-nodes and is the best view for
     * > programmatically working with the graph.
     * @see https://zedux.dev/docs/walkthrough/the-graph#views
     *
     * @default true
     */
    showFlatGraph?: boolean;

    /**
     * Show the top-down graph in the log's details.
     *
     * > An object containing every root node in the graph. Each node's
     * > value is an object containing its dependents who, in turn, contain their
     * > dependents, and so on till the leaf nodes.
     * @see https://zedux.dev/docs/walkthrough/the-graph#views
     *
     * @default true
     */
    showTopDownGraph?: boolean;

    /**
     * Show the bottom-up graph in the log's details.
     *
     * > The inverse of Top-Down. An object containing every leaf node in the
     * > graph. Each node's value is an object containing its dependencies who,
     * > in turn, contain their dependencies, and so on till the root nodes.
     * @see https://zedux.dev/docs/walkthrough/the-graph#views
     *
     * @default true
     */
    showBottomUpGraph?: boolean;

    /**
     * Show the graph by namespaces in the log's details.
     *
     * A variant of the flattened graph where the nodes are grouped by
     * namespaces. Namespaces are the parts of the node's name separated by
     * slashes and the special nodes types.
     *
     * - If a node has parameters or scope, it will be included in the graph
     *   as a child.
     * - If a node is a special node like a react component or a signal,
     *   it will also be included in the graph as a child.
     * - A special key "_" is used for nodes with the same namespaces
     *   like an atom and his signal.
     *
     * For example :
     *
     * - A simple atom named `"a/b/c"` will create the following graph:
     *   `{ a: { b: { c } } }`
     * - A signal atom named `"@signal(a/b/c-["myParam"])-7layrpu"` will create
     *   the following graph:
     *   `{ a: { b: { c: { myParam: { "@signal-7layrpu" } } } } }`
     * - A simple atom `"a"` and his signal "`@signal(a)-7layrpu"` will create
     *   the following graph:
     *   `{ a: { _: "a value", "@signal-7layrpu": "signal value" } }`
     *
     * Special node types included:
     * - `@@rc` for react components
     * - `@@selector` for selectors
     * - `@@listener` for listeners
     * - `@@scope` for scopes
     * - `@signal` for signals
     *
     * @default true
     */
    showByNamespacesGraph?: boolean;

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
     * Show the nodes's dependencies and dependents in the graph by namespaces in the log's details.
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
     * @default false
     */
    showExternalNodesChanges?: boolean;

    /**
     * Hide events related to signals nodes.
     * @default false
     */
    showSignalsChanges?: boolean;
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

export type CompleteZeduxLoggerOptions = DeepRequired<ZeduxLoggerOptions>;
