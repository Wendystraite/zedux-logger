import type { ZeduxLoggerMergedOptions } from '../types/ZeduxLoggerMergedOptions.js';

/**
 * All options disabled for the Zedux logger.
 */

export const ALL_DISABLED_ZEDUX_LOGGER_MERGED_OPTIONS: ZeduxLoggerMergedOptions =
  {
    enabled: false,
    eventsToShow: {
      change: false,
      cycle: false,
      edge: false,
      error: false,
      invalidate: false,
      promiseChange: false,
      resetStart: false,
      resetEnd: false,
      runStart: false,
      runEnd: false,
    },
    oneLineLogs: false,
    showColors: false,
    showInSummary: {
      showEmoji: false,
      showEcosystemName: false,
      showAtomName: false,
      showSummary: false,
      showOperation: false,
      showTtl: false,
      showOldState: false,
      showNewState: false,
      showObserverName: false,
      showWaitingPromises: false,
      showExecutionTime: false,
    },
    showInDetails: {
      showEvent: false,
      showOldState: false,
      showNewState: false,
      showWaitingPromises: false,
      showStateDiff: false,
      showReasons: false,
      showError: false,
      showNode: false,
      showObserver: false,
      showSources: false,
      showObservers: false,
      showEcosystem: false,
      showGraph: false,
      showSnapshot: false,
      showExecutionTime: false,
    },
    executionTimeOptions: {
      warnInConsoleIfSlow: false,
      errorInConsoleIfVerySlow: false,
    },
    graphOptions: {
      showTopDownGraph: false,
      showBottomUpGraph: false,
      showFlatGraph: false,
      showByNamespacesGraph: false,
      showNodesInGraphByNamespaces: false,
      showNodeValueInGraphByNamespaces: false,
      showNodeDepsInGraphByNamespaces: false,
      showExternalNodesInFlatGraph: false,
      showSignalsInFlatGraph: false,
      groupCollapseGraph: false,
    },
    snapshotOptions: {
      groupCollapseSnapshot: false,
    },
    diffOptions: {
      groupCollapseStateDiff: false,
    },
    deobfuscateSingleLetters: false,
    deobfuscateSingleLettersOptions: {
      deobfuscateEvents: false,
      deobfuscateGraphNodes: false,
      deobfuscateReasons: false,
      deobfuscateEcosystem: false,
    },
    debugOptions: {
      logOptions: false,
      checkIncrementalGraphConsistency: false,
      useIncrementalGraph: false,
    },
  };
