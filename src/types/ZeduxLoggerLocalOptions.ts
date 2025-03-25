import type * as Zedux from '@zedux/react';

import type { LogArgs } from '../addToLogs/LogArgs.js';
import type { DeepRequired } from './DeepRequired.js';
import type { ZeduxLoggerColors } from './ZeduxLoggerColors.js';

/**
 * Options for the Zedux logger that can be overridden based on filters.
 */

export interface ZeduxLoggerLocalOptions {
  /**
   * Zedux events to show.
   *
   * Is either an array of event types or an object with the event types as keys.
   * - If an array, you have to specify all the events you want to show. Default options are not provided.
   * - If an object, you can specify only the events you want to hide or show since default options are provided.
   *
   * Internally the logger is listening to all ecosystem's events and filtering them.
   * @see {@link Zedux.EcosystemEvents}
   */
  eventsToShow?:
    | Array<keyof Zedux.EcosystemEvents>
    | {
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
  colors?: ZeduxLoggerColors;

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
   * Options for the old and new state.
   */
  stateOptions?: {
    /**
     * Maximum number of characters shown for the stringified state in the log's summary.
     * No limit if set to 0 or lower.
     * @default 50
     */
    summaryStringifyMaxChars?: number;
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
}

export type CompleteZeduxLoggerLocalOptions =
  DeepRequired<ZeduxLoggerLocalOptions>;
