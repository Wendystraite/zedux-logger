import { getZeduxLoggerMaterialUiColorsTemplate } from '../colors/material-ui-colors.js';
import { getZeduxLoggerTailwindColorsTemplate } from '../colors/tailwind-css-colors.js';
import {
  type ZeduxLoggerBuiltInTemplateKey,
  ZeduxLoggerBuiltInTemplateKeys,
} from '../types/ZeduxLoggerBuiltInTemplateKey.js';
import type { ZeduxLoggerMergedOptions } from '../types/ZeduxLoggerMergedOptions.js';
import { ALL_DISABLED_ZEDUX_LOGGER_MERGED_OPTIONS } from './all-disabled-zedux-logger-merged-options.js';
import { ALL_ENABLED_ZEDUX_LOGGER_MERGED_OPTIONS } from './all-enabled-zedux-logger-merged-options.js';
import { DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS } from './default-zedux-logger-merged-options.js';

export const ZEDUX_LOGGER_BUILT_IN_TEMPLATES: Record<
  ZeduxLoggerBuiltInTemplateKey,
  ZeduxLoggerMergedOptions
> = {
  [ZeduxLoggerBuiltInTemplateKeys.default]: DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS,
  [ZeduxLoggerBuiltInTemplateKeys.allEnabled]:
    ALL_ENABLED_ZEDUX_LOGGER_MERGED_OPTIONS,
  [ZeduxLoggerBuiltInTemplateKeys.allDisabled]:
    ALL_DISABLED_ZEDUX_LOGGER_MERGED_OPTIONS,

  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind50]:
    getZeduxLoggerTailwindColorsTemplate(0),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind100]:
    getZeduxLoggerTailwindColorsTemplate(1),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind200]:
    getZeduxLoggerTailwindColorsTemplate(2),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind300]:
    getZeduxLoggerTailwindColorsTemplate(3),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind400]:
    getZeduxLoggerTailwindColorsTemplate(4),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind]:
    getZeduxLoggerTailwindColorsTemplate(5),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind500]:
    getZeduxLoggerTailwindColorsTemplate(5),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind600]:
    getZeduxLoggerTailwindColorsTemplate(6),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind700]:
    getZeduxLoggerTailwindColorsTemplate(7),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind800]:
    getZeduxLoggerTailwindColorsTemplate(8),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind900]:
    getZeduxLoggerTailwindColorsTemplate(9),
  [ZeduxLoggerBuiltInTemplateKeys.colorsTailwind950]:
    getZeduxLoggerTailwindColorsTemplate(10),

  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi50]:
    getZeduxLoggerMaterialUiColorsTemplate(0),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi100]:
    getZeduxLoggerMaterialUiColorsTemplate(1),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi200]:
    getZeduxLoggerMaterialUiColorsTemplate(2),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi300]:
    getZeduxLoggerMaterialUiColorsTemplate(3),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi400]:
    getZeduxLoggerMaterialUiColorsTemplate(4),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi]:
    getZeduxLoggerMaterialUiColorsTemplate(5),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi500]:
    getZeduxLoggerMaterialUiColorsTemplate(5),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi600]:
    getZeduxLoggerMaterialUiColorsTemplate(6),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi700]:
    getZeduxLoggerMaterialUiColorsTemplate(7),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi800]:
    getZeduxLoggerMaterialUiColorsTemplate(8),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUi900]:
    getZeduxLoggerMaterialUiColorsTemplate(9),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUiA100]:
    getZeduxLoggerMaterialUiColorsTemplate(10),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUiA200]:
    getZeduxLoggerMaterialUiColorsTemplate(11),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUiA400]:
    getZeduxLoggerMaterialUiColorsTemplate(12),
  [ZeduxLoggerBuiltInTemplateKeys.colorsMaterialUiA700]:
    getZeduxLoggerMaterialUiColorsTemplate(13),

  [ZeduxLoggerBuiltInTemplateKeys.allEvents]: {
    eventsToShow: {
      change: true,
      cycle: true,
      edge: true,
      error: true,
      invalidate: true,
      promiseChange: true,
      resetEnd: true,
      resetStart: true,
      runEnd: true,
      runStart: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.noEvents]: {
    eventsToShow: {
      change: false,
      cycle: false,
      edge: false,
      error: false,
      invalidate: false,
      promiseChange: false,
      resetEnd: false,
      resetStart: false,
      runEnd: false,
      runStart: false,
    },
  },

  [ZeduxLoggerBuiltInTemplateKeys.oneLineLogs]: {
    oneLineLogs: true,
  },
  [ZeduxLoggerBuiltInTemplateKeys.groupedLogs]: {
    oneLineLogs: false,
  },

  [ZeduxLoggerBuiltInTemplateKeys.showColors]: {
    showColors: true,
  },
  [ZeduxLoggerBuiltInTemplateKeys.noColors]: {
    showColors: false,
  },

  [ZeduxLoggerBuiltInTemplateKeys.allGraphs]: {
    showInDetails: {
      showSnapshot: true,
    },
    graphOptions: {
      showFlatGraph: true,
      showByNamespacesGraph: true,
      showTopDownGraph: true,
      showBottomUpGraph: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.noGraphs]: {
    showInDetails: {
      showSnapshot: false,
    },
    graphOptions: {
      showFlatGraph: false,
      showByNamespacesGraph: false,
      showTopDownGraph: false,
      showBottomUpGraph: false,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.flatGraph]: {
    showInDetails: {
      showSnapshot: true,
    },
    graphOptions: {
      showFlatGraph: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.byNamespacesGraph]: {
    showInDetails: {
      showSnapshot: true,
    },
    graphOptions: {
      showByNamespacesGraph: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.topDownGraph]: {
    showInDetails: {
      showSnapshot: true,
    },
    graphOptions: {
      showTopDownGraph: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.bottomUpGraph]: {
    showInDetails: {
      showSnapshot: true,
    },
    graphOptions: {
      showBottomUpGraph: true,
    },
  },

  [ZeduxLoggerBuiltInTemplateKeys.snapshots]: {
    showInDetails: {
      showSnapshot: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.noSnapshots]: {
    showInDetails: {
      showSnapshot: false,
    },
  },

  [ZeduxLoggerBuiltInTemplateKeys.deobfuscate]: {
    deobfuscateSingleLetters: true,
  },
  [ZeduxLoggerBuiltInTemplateKeys.noDeobfuscate]: {
    deobfuscateSingleLetters: false,
  },

  [ZeduxLoggerBuiltInTemplateKeys.executionTimeWarnings]: {
    executionTimeOptions: {
      warnInConsoleIfSlow: true,
      errorInConsoleIfVerySlow: true,
    },
  },
  [ZeduxLoggerBuiltInTemplateKeys.noExecutionTimeWarnings]: {
    executionTimeOptions: {
      warnInConsoleIfSlow: true,
      errorInConsoleIfVerySlow: true,
    },
  },

  [ZeduxLoggerBuiltInTemplateKeys.showAllSummary]: {
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
  },
  [ZeduxLoggerBuiltInTemplateKeys.noSummary]: {
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
  },

  [ZeduxLoggerBuiltInTemplateKeys.showAllDetails]: {
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
  },
  [ZeduxLoggerBuiltInTemplateKeys.noDetails]: {
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
  },
};
