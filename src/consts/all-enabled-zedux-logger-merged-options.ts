import type { ZeduxLoggerMergedOptions } from '../types/ZeduxLoggerMergedOptions.js';

/**
 * All options enabled for the Zedux logger.
 */

export const ALL_ENABLED_ZEDUX_LOGGER_MERGED_OPTIONS: ZeduxLoggerMergedOptions =
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
    oneLineLogs: true,
    showColors: true,
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
      warnInConsoleIfSlow: true,
      errorInConsoleIfVerySlow: true,
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
  };
