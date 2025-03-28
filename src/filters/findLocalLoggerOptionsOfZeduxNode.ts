import type { ZeduxNode } from '@zedux/react';

import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import { doesZeduxNodeMatchesLoggerFilter } from './doesZeduxNodeMatchesLoggerFilter.js';

export function findLocalLoggerOptionsOfZeduxNode(
  node: ZeduxNode,
  filters: ZeduxLoggerEcosystemStorage['filters'],
): CompleteZeduxLoggerLocalOptions | undefined {
  for (const filter of filters) {
    const isExcluded =
      filter.exclude !== undefined &&
      filter.exclude.length > 0 &&
      filter.exclude.some((filter) => {
        return doesZeduxNodeMatchesLoggerFilter(node, filter);
      });

    if (!isExcluded) {
      const isIncluded =
        filter.include === undefined ||
        filter.include.length <= 0 ||
        filter.include.some((filter) => {
          return doesZeduxNodeMatchesLoggerFilter(node, filter);
        });

      if (isIncluded) {
        return filter.options;
      }
    }
  }
}
