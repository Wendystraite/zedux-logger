import type { ZeduxNode } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import type {
  CompleteZeduxLoggerOptions,
  ZeduxLoggerOptions,
} from './ZeduxLoggerOptions.js';

export interface ZeduxLoggerEcosystemStorage {
  oldSnapshotRef: { current: unknown };
  graphRef: { current: Graph | undefined };
  consistencyCheckTimeoutIdRef: { current: number | undefined };
  originalOptions: ZeduxLoggerOptions | undefined;
  completeOptions: CompleteZeduxLoggerOptions;
  runStartTimeMapping: Map<ZeduxNode, /** performance.now() */ number>;
}
