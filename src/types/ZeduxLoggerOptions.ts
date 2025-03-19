import type * as Zedux from '@zedux/react';

import type { LogArgs } from '../addToLogs/LogArgs.js';
import type { DeepRequired } from './DeepRequired.js';

/**
 * Colors from tailwindcss.
 * @see https://tailwindcss.com/docs/colors
 */

const NORMAL_COLOR = `color: inherit; font-weight: normal;`;
const MUTED_COLOR = `color: #6a7282; font-weight: lighter;`;
const RED = `color: #fb2c36; font-weight: normal;`;
const GRAY = `color: #6a7282; font-weight: normal;`;
const BLUE = `color: #2b7fff; font-weight: normal;`;
const AMBER = `color: #fe9a00; font-weight: normal;`;
const GREEN = `color: #00c951; font-weight: normal;`;
const ORANGE = `color: #ff6900; font-weight: normal;`;
const PURPLE = `color: #ad46ff; font-weight: normal;`;

const DEFAULT_ZEDUX_LOGGER_COLORS: CompleteZeduxLoggerOptions['colors'] = {
  default: MUTED_COLOR,
  ecosystemResetStart: ORANGE,
  ecosystemResetEnd: ORANGE,
  initializing: PURPLE,
  initializingPromise: PURPLE,
  initialized: BLUE,
  active: BLUE,
  stale: AMBER,
  destroyed: RED,
  invalidate: AMBER,
  changed: GREEN,
  promiseChange: GREEN,
  promiseChangeLoading: PURPLE,
  promiseChangeSuccess: GREEN,
  promiseChangeError: RED,
  error: RED,
  unknown: RED,
  edgeCreated: MUTED_COLOR,
  edgeUpdated: MUTED_COLOR,
  edgeRemoved: MUTED_COLOR,
  evaluating: MUTED_COLOR,
  evaluated: MUTED_COLOR,
  waitingForPromisesNodes: PURPLE,
  ecosystemName: GRAY,
  operation: NORMAL_COLOR,
  executionTimeNormal: NORMAL_COLOR,
  executionTimeSlow: AMBER,
  executionTimeVerySlow: RED,
  atomNameNamespace: MUTED_COLOR,
  atomNameLastNamespace: NORMAL_COLOR,
  atomNameParams: MUTED_COLOR,
  atomNameScope: MUTED_COLOR,
  atomNameSignalUid: MUTED_COLOR,
  atomNameReactComponentName: NORMAL_COLOR,
  atomNameSelectorName: NORMAL_COLOR,
  atomNameSelectorUid: MUTED_COLOR,
  atomNameListenerUid: MUTED_COLOR,
  ttl: NORMAL_COLOR,
  oldState: NORMAL_COLOR,
  newState: NORMAL_COLOR,
  diffCreate: GREEN,
  diffRemove: RED,
  diffChange: BLUE,
  groupOldState: MUTED_COLOR,
  groupNewState: GREEN,
  groupOldSnapshot: MUTED_COLOR,
  groupNewSnapshot: GREEN,
};

/**
 * Default options for the Zedux logger.
 */
export const DEFAULT_ZEDUX_LOGGER_OPTIONS: CompleteZeduxLoggerOptions = {
  enabled: true,
  eventsToShow: {
    change: true,
    cycle: true,
    edge: false,
    error: true,
    invalidate: true,
    promiseChange: true,
    resetStart: true,
    resetEnd: true,
    runStart: false,
    runEnd: false,
  },
  disableLoggingTag: null,
  console,
  oneLineLogs: false,
  showColors: true,
  colors: DEFAULT_ZEDUX_LOGGER_COLORS,
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
    showExecutionTime: true,
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
    showSources: true,
    showObservers: true,
    showEcosystem: true,
    showGraph: true,
    showSnapshot: true,
    showExecutionTime: true,
  },
  executionTimeOptions: {
    slowThresholdMs: 50,
    verySlowThresholdMs: 100,
    warnInConsoleIfSlow: true,
    errorInConsoleIfVerySlow: true,
    onSlowEvaluation: null,
    onVerySlowEvaluation: null,
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
  deobfuscateSingleLetters: true,
  deobfuscateSingleLettersOptions: {
    deobfuscateEvents: true,
    deobfuscateGraphNodes: true,
    deobfuscateReasons: true,
    deobfuscateEcosystem: true,
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
  eventsToShow: {
    change: true,
    cycle: true,
    edge: true,
    error: true,
    invalidate: true,
    promiseChange: true,
    resetStart: true,
    resetEnd: true,
    runStart: true,
    runEnd: true,
  },
  disableLoggingTag: DEFAULT_ZEDUX_LOGGER_OPTIONS.disableLoggingTag,
  console: DEFAULT_ZEDUX_LOGGER_OPTIONS.console,
  oneLineLogs: true,
  showColors: true,
  colors: DEFAULT_ZEDUX_LOGGER_OPTIONS.colors,
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
    showExecutionTime: true,
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
    showSources: true,
    showObservers: true,
    showEcosystem: true,
    showGraph: true,
    showSnapshot: true,
    showExecutionTime: true,
  },
  executionTimeOptions: {
    slowThresholdMs:
      DEFAULT_ZEDUX_LOGGER_OPTIONS.executionTimeOptions.slowThresholdMs,
    verySlowThresholdMs:
      DEFAULT_ZEDUX_LOGGER_OPTIONS.executionTimeOptions.verySlowThresholdMs,
    warnInConsoleIfSlow: true,
    errorInConsoleIfVerySlow: true,
    onSlowEvaluation:
      DEFAULT_ZEDUX_LOGGER_OPTIONS.executionTimeOptions.onSlowEvaluation,
    onVerySlowEvaluation:
      DEFAULT_ZEDUX_LOGGER_OPTIONS.executionTimeOptions.onVerySlowEvaluation,
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
  deobfuscateSingleLetters: true,
  deobfuscateSingleLettersOptions: {
    deobfuscateEvents: true,
    deobfuscateGraphNodes: true,
    deobfuscateReasons: true,
    deobfuscateEcosystem: true,
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
   * Zedux events to show.
   * Internally the logger is listening to all ecosystem's events and filtering them.
   * @see {@link Zedux.EcosystemEvents}
   */
  eventsToShow?: {
    /**
     * Log {@link Zedux.ChangeEvent}.
     *
     * Example :
     * - "[✏️] test atom changed from 0 to 1"
     *
     * @default true
     */
    change?: boolean;

    /**
     * Log {@link Zedux.CycleEvent}.
     *
     * Examples :
     * - "[⚡] simple atom initialized to 0"
     * - "[🕰️] simple atom stale"
     * - "[💥] simple atom destroyed"
     *
     * @default true
     */
    cycle?: boolean;

    /**
     * Log {@link Zedux.EdgeEvent}.
     *
     * Example :
     * - "[📈] sourceAtom edge added targetAtom"
     *
     * @default false
     */
    edge?: boolean;

    /**
     * Log {@link Zedux.ErrorEvent}.
     *
     * Example :
     * - "[❌] errorAtom error"
     *
     * @default true
     */
    error?: boolean;

    /**
     * Log {@link Zedux.InvalidateEvent}.
     *
     * Example :
     * - "[🗑️] test atom invalidate"
     *
     * @default true
     */
    invalidate?: boolean;

    /**
     * Log {@link Zedux.PromiseChangeEvent}.
     *
     * Example :
     * - "[⌛] async promise loading"
     *
     * @default true
     */
    promiseChange?: boolean;

    /**
     * Log {@link Zedux.ResetStartEvent}.
     *
     * Example :
     * - "[🧹] resetting ecosystem"
     *
     * @default true
     */
    resetStart?: boolean;

    /**
     * Log {@link Zedux.ResetEndEvent}.
     *
     * Example :
     * - "[🧹] ecosystem reset"
     *
     * @default true
     */
    resetEnd?: boolean;

    /**
     * Log {@link Zedux.RunStartEvent}.
     *
     * Example :
     * - "[⚙️] simple atom evaluating"
     *
     * @default false
     */
    runStart?: boolean;

    /**
     * Log {@link Zedux.RunEndEvent}.
     *
     * Example :
     * - "[⚙️] simple atom evaluated in 3ms"
     *
     * @default false
     */
    runEnd?: boolean;
  };

  /**
   * If this tag is present in an atom's tags, logging will be disabled for that atom.
   */
  disableLoggingTag?: string | null;

  /**
   * Console-like object to use for logging.
   */
  console?: Pick<
    Console,
    'log' | 'warn' | 'error' | 'group' | 'groupCollapsed' | 'groupEnd'
  >;

  /**
   * Instead of using console.group, use a single console.log per event.
   * Useful for logging to a file, for easier copy-pasting or as a simple preference.
   * @default false
   */
  oneLineLogs?: boolean;

  /**
   * Show colors in the logs.
   * @default true
   */
  showColors?: boolean;

  /**
   * Colors used in the logs.
   */
  colors?: {
    /** Default color used in all logs */
    default: string;
    /** If `showInSummary.showSummary` is `true` ; when resetting ecosystem on {@link Zedux.ResetStartEvent} */
    ecosystemResetStart: string;
    /** If `showInSummary.showSummary` is `true` ; after resetting ecosystem on {@link Zedux.ResetEndEvent} */
    ecosystemResetEnd: string;
    /** If `showInSummary.showSummary` is `true` ; when initializing an atom on {@link Zedux.CycleEvent} with newStatus to `Initializing` */
    initializing: string;
    /** If `showInSummary.showSummary` is `true` ; when initializing an atom that has running promises as dependencies on {@link Zedux.CycleEvent} with newStatus to `Active` */
    initializingPromise: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom initialized on {@link Zedux.CycleEvent} with oldStatus to `Initializing` and newStatus to `Active` */
    initialized: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom become active on {@link Zedux.CycleEvent} with newStatus to `Active` */
    active: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom become stale on {@link Zedux.CycleEvent} with newStatus to `Stale` */
    stale: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom is destroyed on {@link Zedux.CycleEvent} with newStatus to `Destroyed` */
    destroyed: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom is invalidated on {@link Zedux.InvalidateEvent} */
    invalidate: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom's state changed on {@link Zedux.ChangeEvent} */
    changed: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom's promise change on {@link Zedux.PromiseChangeEvent} with promise's status to `undefined` */
    promiseChange: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom's promise is loading on {@link Zedux.PromiseChangeEvent} with promise's status to `loading` */
    promiseChangeLoading: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom's promise resolved on {@link Zedux.PromiseChangeEvent} with promise's status to `success` */
    promiseChangeSuccess: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom's promise rejected on {@link Zedux.PromiseChangeEvent} with promise's status to `error` */
    promiseChangeError: string;
    /** If `showInSummary.showSummary` is `true` ; when an error occurred on {@link Zedux.ErrorEvent} */
    error: string;
    /** If `showInSummary.showSummary` is `true` ; when an unknown event occurred from {@link Zedux.EcosystemEvents} */
    unknown: string;
    /** If `showInSummary.showSummary` is `true` ; when a graph edge is created on {@link Zedux.EdgeEvent} with action to `add` */
    edgeCreated: string;
    /** If `showInSummary.showSummary` is `true` ; when a graph edge is updated on {@link Zedux.EdgeEvent} with action to `update` */
    edgeUpdated: string;
    /** If `showInSummary.showSummary` is `true` ; when a graph edge is removed on {@link Zedux.EdgeEvent} with action to `remove` */
    edgeRemoved: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom evaluation starts on {@link Zedux.RunStartEvent} */
    evaluating: string;
    /** If `showInSummary.showSummary` is `true` ; when an atom evaluation completes on {@link Zedux.RunEndEvent} */
    evaluated: string;
    /** If `showInSummary.showWaitingPromises` is `true` ; when an atom has running promises as dependencies */
    waitingForPromisesNodes: string;
    /** If `showInSummary.showEcosystemName` is `true` ; color of the ecosystem's name */
    ecosystemName: string;
    /** If `showInSummary.showOperation` is `true` ; color of the zedux operation's name ({@link Zedux.EventBase['operation']}) */
    operation: string;
    /** If `showInSummary.showExecutionTime` is `true` ; color of the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent} if `executionTimeOptions.slowThresholdMs` is not exceeded */
    executionTimeNormal: string;
    /** If `showInSummary.showExecutionTime` is `true` ; color of the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent} if `executionTimeOptions.slowThresholdMs` is exceeded */
    executionTimeSlow: string;
    /** If `showInSummary.showExecutionTime` is `true` ; color of the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent} if `executionTimeOptions.verySlowThresholdMs` is exceeded */
    executionTimeVerySlow: string;
    /** Color for atom namespace parts except the last one */
    atomNameNamespace: string;
    /** Color for the last part of atom namespace */
    atomNameLastNamespace: string;
    /** Color for atom parameters */
    atomNameParams: string;
    /** Color for atom scope */
    atomNameScope: string;
    /** Color for signal unique identifier */
    atomNameSignalUid: string;
    /** Color for selector name */
    atomNameSelectorName: string;
    /** Color for React component name */
    atomNameReactComponentName: string;
    /** Color for selector unique identifier */
    atomNameSelectorUid: string;
    /** Color for listener unique identifier */
    atomNameListenerUid: string;
    /** If `showInSummary.showTtl` is `true` ; color of the time-to-live value */
    ttl: string;
    /** If `showInSummary.showOldState` is `true` ; color of the old state */
    oldState: string;
    /** If `showInSummary.showNewState` is `true` ; color of the new state */
    newState: string;
    /** Color for created entries in minidiff's state diff */
    diffCreate: string;
    /** Color for removed entries in minidiff's state diff */
    diffRemove: string;
    /** Color for changed entries in minidiff's state diff */
    diffChange: string;
    /** If `showInDetails.showOldState` is `true` ; color for old state group header */
    groupOldState: string;
    /** If `showInDetails.showNewState` is `true` ; color for new state group header */
    groupNewState: string;
    /** If `showInDetails.showSnapshot` is `true` ; color for old snapshot group header */
    groupOldSnapshot: string;
    /** If `showInDetails.showSnapshot` is `true` ; color for new snapshot group header */
    groupNewSnapshot: string;
  };

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

    /**
     * Measure the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent}.
     * Performance is measured in milliseconds with {@link performance.now}.
     * Shown in summary rounded to 2 decimal places.
     * Shown in details with more precision.
     * @default true
     */
    showExecutionTime?: boolean;
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
     * Show the sources of the node in the log's details.
     * @default true
     */
    showSources?: boolean;

    /**
     * Show the observers of the node in the log's details.
     * @default true
     */
    showObservers?: boolean;

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

    /**
     * Measure the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent}.
     * Performance is measured in milliseconds with {@link performance.now}.
     * Shown in summary rounded to 2 decimal places.
     * Shown in details with more precision.
     * @default true
     */
    showExecutionTime?: boolean;
  };

  /**
   * Options for the execution performance measured in the logs.
   */
  executionTimeOptions?: {
    /**
     * Threshold in milliseconds for what's considered a slow evaluation.
     * @default 50
     */
    slowThresholdMs?: number;

    /**
     * Threshold in milliseconds for what's considered a very slow evaluation.
     * @default 100
     */
    verySlowThresholdMs?: number;

    /**
     * Log a warning in the console if the evaluation is slow (execution time is above the slowThresholdMs).
     * Will warn even if showExecutionTime is false.
     * @default true
     */
    warnInConsoleIfSlow?: boolean;

    /**
     * Log an error in the console if the evaluation is very slow (execution time is above the verySlowThresholdMs).
     * Will error even if showExecutionTime is false.
     * @default true
     */
    errorInConsoleIfVerySlow?: boolean;

    /**
     * Callback called when the evaluation is slow.
     * Will be called even if showExecutionTime is false.
     * @param node slow node
     * @param executionTimeMs time in milliseconds the evaluation took. Measured with {@link performance.now}.
     * @param logArgs additional data about the log
     */
    onSlowEvaluation?:
      | ((
          node: Zedux.ZeduxNode,
          executionTimeMs: number,
          logArgs: LogArgs,
        ) => void)
      | null;

    /**
     * Callback called when the evaluation is very slow.
     * Will be called even if showExecutionTime is false.
     * @param node slow node
     * @param executionTimeMs time in milliseconds the evaluation took. Measured with {@link performance.now}.
     * @param logArgs additional data about the log
     */
    onVerySlowEvaluation?:
      | ((
          node: Zedux.ZeduxNode,
          executionTimeMs: number,
          logArgs: LogArgs,
        ) => void)
      | null;
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
     * > value is an object containing its observers who, in turn, contain their
     * > observers, and so on till the leaf nodes.
     * @see https://zedux.dev/docs/walkthrough/the-graph#views
     *
     * @default true
     */
    showTopDownGraph?: boolean;

    /**
     * Show the bottom-up graph in the log's details.
     *
     * > The inverse of Top-Down. An object containing every leaf node in the
     * > graph. Each node's value is an object containing its sources who,
     * > in turn, contain their sources, and so on till the root nodes.
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
   * @default true
   */
  deobfuscateSingleLetters?: boolean;

  /**
   * Options to deobfuscate the single letters public apis presents in the zedux objects.
   */
  deobfuscateSingleLettersOptions?: {
    /**
     * Deobfuscate zedux's {@link Zedux.EcosystemEvents}
     * @default true
     */
    deobfuscateEvents?: boolean;

    /**
     * Deobfuscate zedux's {@link Zedux.GraphNode}
     * @default true
     */
    deobfuscateGraphNodes?: boolean;

    /**
     * Deobfuscate zedux's {@link Zedux.EvaluationReason}
     * @default true
     */
    deobfuscateReasons?: boolean;

    /**
     * Deobfuscate zedux's {@link Zedux.Ecosystem}
     * @default true
     */
    deobfuscateEcosystem?: boolean;
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
