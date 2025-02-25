import type { EcosystemEvents } from '@zedux/react';

export interface ZeduxLoggerOptions {
  enabled: boolean;

  events: Array<EcosystemEvents[keyof EcosystemEvents]['type']>;
  disableLoggingFlag: string;
  console: Console;

  showGraph: boolean;
  showGraphByNamespaces: boolean;
  showSnapshot: boolean;
  showEcosystem: boolean;
  showEcosystemName: boolean;
  showTtl: boolean;
  showOldState: boolean;
  showNewState: boolean;
  showStateDiff: boolean;
  showReasons: boolean;
  showError: boolean;
  showNode: boolean;
  showObserver: boolean;
  showEvent: boolean;
  showSummaryEmoji: boolean;
  showWaitingPromises: boolean;

  hideExternalNodesChanges: boolean;
  hideExternalNodesFromFlatGraph: boolean;
  hideSignalsChanges: boolean;
  hideSignalsFromFlatGraph: boolean;

  groupCollapseStateDiff: boolean;
  groupCollapseGraph: boolean;
  groupCollapseSnapshot: boolean;

  deobfuscateEvent: boolean;
  deobfuscateNode: boolean;
  deobfuscateReasons: boolean;
  deobfuscateEcosystem: boolean;
}
