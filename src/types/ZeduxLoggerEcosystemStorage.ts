import type { ZeduxNode } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import type { ZeduxLoggerFilter } from './ZeduxLoggerFilter.js';
import type { CompleteZeduxLoggerGlobalOptions } from './ZeduxLoggerGlobalOptions.js';
import type { CompleteZeduxLoggerLocalOptions } from './ZeduxLoggerLocalOptions.js';
import type { CompleteZeduxLoggerMergedOptions } from './ZeduxLoggerMergedOptions.js';
import type { ZeduxLoggerOptions } from './ZeduxLoggerOptions.js';

export interface ZeduxLoggerEcosystemStorage {
  /**
   * The previous snapshot of the ecosystem.
   */
  snapshot: Record<string, unknown> | undefined;
  /**
   * The graph of the ecosystem.
   */
  graph: Graph | undefined;
  /**
   * The ID of the timeout for the graph's consistency check.
   */
  consistencyCheckTimeoutId: ReturnType<typeof setTimeout> | undefined;
  /**
   * The original options provided to the logger.
   */
  originalOptions: ZeduxLoggerOptions | undefined;
  /**
   * The complete merged options for the logger.
   */
  completeMergedOptions: CompleteZeduxLoggerMergedOptions;
  /**
   * The complete global options for the logger.
   */
  completeGlobalOptions: CompleteZeduxLoggerGlobalOptions;
  /**
   * The filters for the logger with the complete local options for each filter.
   */
  filters: Array<
    Omit<ZeduxLoggerFilter, 'options'> & {
      options: CompleteZeduxLoggerLocalOptions;
    }
  >;
  /**
   * A mapping of nodes to the time they started running (@link RunStartEvent).
   */
  runStartTimeMapping: Map<ZeduxNode, /** performance.now() */ number>;

  /** Whether the logger is generating a graph */
  calculateGraph: boolean;
  /** Whether the logger is generating an incremental graph */
  calculateIncrementalGraph: boolean;
  /** Whether the logger is generating a top down graph */
  calculateTopDownGraph: boolean;
  /** Whether the logger is generating a bottom up graph */
  calculateBottomUpGraph: boolean;
  /** Whether the logger is generating a flat graph */
  calculateFlatGraph: boolean;
  /** Whether the logger is generating a by namespaces graph */
  calculateByNamespacesGraph: boolean;
  /** Whether the logger is generating a snapshot */
  calculateSnapshot: boolean;
}
