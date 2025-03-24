export const ZeduxLoggerBuiltInTemplateKeys = {
  /** The default logger options */
  default: 'default',
  allEnabled: 'all-enabled',
  allDisabled: 'all-disabled',

  /** Tailwind colors */
  colorsTailwind: 'colors-tailwind',
  colorsTailwind50: 'colors-tailwind-50',
  colorsTailwind100: 'colors-tailwind-100',
  colorsTailwind200: 'colors-tailwind-200',
  colorsTailwind300: 'colors-tailwind-300',
  colorsTailwind400: 'colors-tailwind-400',
  colorsTailwind500: 'colors-tailwind-500',
  colorsTailwind600: 'colors-tailwind-600',
  colorsTailwind700: 'colors-tailwind-700',
  colorsTailwind800: 'colors-tailwind-800',
  colorsTailwind900: 'colors-tailwind-900',
  colorsTailwind950: 'colors-tailwind-950',

  /** Material UI colors */
  colorsMaterialUi: 'colors-material-ui',
  colorsMaterialUi50: 'colors-material-ui-50',
  colorsMaterialUi100: 'colors-material-ui-100',
  colorsMaterialUi200: 'colors-material-ui-200',
  colorsMaterialUi300: 'colors-material-ui-300',
  colorsMaterialUi400: 'colors-material-ui-400',
  colorsMaterialUi500: 'colors-material-ui-500',
  colorsMaterialUi600: 'colors-material-ui-600',
  colorsMaterialUi700: 'colors-material-ui-700',
  colorsMaterialUi800: 'colors-material-ui-800',
  colorsMaterialUi900: 'colors-material-ui-900',
  colorsMaterialUiA100: 'colors-material-ui-a100',
  colorsMaterialUiA200: 'colors-material-ui-a200',
  colorsMaterialUiA400: 'colors-material-ui-a400',
  colorsMaterialUiA700: 'colors-material-ui-a700',

  /** Events */
  allEvents: 'all-events',
  noEvents: 'no-events',

  /** Logs */
  oneLineLogs: 'one-line-logs',
  groupedLogs: 'grouped-logs',

  /** Colors */
  showColors: 'show-colors',
  noColors: 'no-colors',

  /** Graphs */
  allGraphs: 'all-graphs',
  noGraphs: 'no-graphs',
  flatGraph: 'flat-graph',
  byNamespacesGraph: 'by-namespaces-graph',
  topDownGraph: 'top-down-graph',
  bottomUpGraph: 'bottom-up-graph',

  /** Snapshots */
  snapshots: 'snapshots',
  noSnapshots: 'no-snapshots',

  /** Deobfuscate single letters */
  deobfuscate: 'deobfuscate',
  noDeobfuscate: 'no-deobfuscate',

  /** Execution time */
  executionTimeWarnings: 'execution-time-warnings',
  noExecutionTimeWarnings: 'no-execution-time-warnings',

  /** Log's summary */
  showAllSummary: 'show-all-summary',
  noSummary: 'no-summary',

  /** Log's details */
  showAllDetails: 'show-all-details',
  noDetails: 'no-details',
} as const;

export type ZeduxLoggerBuiltInTemplateKey =
  (typeof ZeduxLoggerBuiltInTemplateKeys)[keyof typeof ZeduxLoggerBuiltInTemplateKeys];
