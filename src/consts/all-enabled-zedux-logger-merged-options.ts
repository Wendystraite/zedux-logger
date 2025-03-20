import type { CompleteZeduxLoggerMergedOptions } from '../types/ZeduxLoggerMergedOptions.js';
import { DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS } from './default-zedux-logger-local-options.js';

/**
 * All options enabled for the Zedux logger.
 */

export const ALL_ENABLED_ZEDUX_LOGGER_MERGED_OPTIONS: CompleteZeduxLoggerMergedOptions =
  {
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
    console: DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.console,
    oneLineLogs: true,
    showColors: true,
    colors: DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.colors,
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
        DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.executionTimeOptions.slowThresholdMs,
      verySlowThresholdMs:
        DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.executionTimeOptions
          .verySlowThresholdMs,
      warnInConsoleIfSlow: true,
      errorInConsoleIfVerySlow: true,
      onSlowEvaluation:
        DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.executionTimeOptions
          .onSlowEvaluation,
      onVerySlowEvaluation:
        DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS.executionTimeOptions
          .onVerySlowEvaluation,
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
