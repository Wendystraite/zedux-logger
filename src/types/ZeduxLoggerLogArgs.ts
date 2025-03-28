import type { Graph } from '../generateGraph/generateGraph.js';
import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { ZeduxLoggerEcosystemStorage } from './ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerGlobalOptions } from './ZeduxLoggerGlobalOptions.js';
import type { CompleteZeduxLoggerLocalOptions } from './ZeduxLoggerLocalOptions.js';

/**
 * The arguments passed to each log function in the logger.
 *
 * Each log function will call either `addLogToSummary` or `addLogToDetails` to
 * either add a log to the summary or the details of the logger.
 *
 * After every log function is called, the logger will log everything to the
 * console.
 */
export interface ZeduxLoggerLogArgs {
  /** The log's summary that will be logged. Can be changed with the `addLogToSummary` method. */
  readonly logSummary: string;

  /** The log's summary colors that will be logged. Can be changed with the `addLogToSummary` method. */
  readonly logSummaryColors: string[];

  /** The log's details that will be logged. Can be changed with the `addLogToDetails` method. */
  readonly details: ZeduxLoggerLogDetail[];

  /**
   * Adds a log to the summary.
   *
   * @param log The log message appended to the summary.
   * @param colors The colors to show in the console for the log message. The log string must contains "%c" for each color.
   *
   * @example
   * addLogToSummary('%c[🚀]', "#FF0000");
   */
  addLogToSummary(this: void, log: string, ...colors: string[]): void;

  /**
   * Adds a log to the details.
   *
   * @param detail The log detail to be added to the details.
   * @param detail.emoji The emoji associated with the log.
   * @param detail.log The log message to be displayed in the console.
   * @param detail.colors The colors to show in the console for the log message.
   * @param detail.subLogs The sub-logs to be displayed in the console.
   * @param detail.groupCollapsedSubLogs Whether to collapse the subLogs in the console.
   * @param detail.data The data to be displayed in the console.
   *
   * @example
   * addLogToDetails({
   *   emoji: '🔗',
   *   log: 'node',
   *   data: node
   * });
   *
   * @example
   * addLogToDetails({
   *   emoji: '📈',
   *   log: 'graph',
   *   groupCollapsedSubLogs: groupCollapseGraph,
   *   subLogs: [
   *     showFlatGraph && {
   *       log: 'flat',
   *       data: graph.flat,
   *     },
   *     {
   *       log: 'top-down',
   *       data: graph.topDown,
   *     },
   *   ],
   * });
   */
  addLogToDetails(this: void, detail: ZeduxLoggerLogDetail): void;

  /** All the logger's internal data */
  storage: ZeduxLoggerEcosystemStorage;

  /** The result of the logger's parsing of the event */
  what: WhatHappened;

  /** The global logger's options used for this log. Can change based on the filter used. */
  globalOptions: CompleteZeduxLoggerGlobalOptions;

  /** The local logger's options used for this log. Can change based on the filter used. */
  options: CompleteZeduxLoggerLocalOptions;

  /** The graph generated by the logger. */
  graph: Graph | undefined;

  /** The snapshot generated by the logger. */
  snapshot: Record<string, unknown> | undefined;

  /** Time in milliseconds that the run took to execute between the runStart and runEnd events. */
  runExecutionTimeMs: number | undefined;
}

export interface ZeduxLoggerLogDetail {
  /**
   * The emoji associated with the log.
   */
  emoji?: string;

  /**
   * The log message to be displayed in the console.
   * Is displayed as group title if `oneLineLogs` is false.
   * Is displayed as an object key if `oneLineLogs` is true.
   */
  log: string;

  /**
   * Colors to show in the console for the log message.
   * Only works if `oneLineLogs` is false and the log string contains "%c" for each color.
   */
  colors?: string[];

  /**
   * Sub-logs to be displayed in the console.
   * If `oneLineLogs` is true, the sub-logs will be displayed in the same object.
   * If `oneLineLogs` is false, the sub-logs will be displayed in sub groups.
   */
  subLogs?: Array<ZeduxLoggerLogDetail | false | undefined>;

  /**
   * Whether to collapse the subLogs in the console if `oneLineLogs` is false.
   * @default false
   */
  groupCollapsedSubLogs?: boolean;

  /**
   * The data to be displayed in the console.
   */
  data?: unknown;
}
