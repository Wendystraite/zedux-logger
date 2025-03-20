import type { ZeduxNode } from '@zedux/react';

import { doesZeduxLoggerNodeFilterMatch } from './doesZeduxLoggerNodeFilterMatch.js';
import type { ZeduxLoggerEcosystemStorage } from './types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from './types/ZeduxLoggerLocalOptions.js';

export function getNodeLocalOptions(
  node: ZeduxNode,
  filters: ZeduxLoggerEcosystemStorage['filters'],
): CompleteZeduxLoggerLocalOptions | undefined {
  for (const filter of filters) {
    const isExcluded =
      filter.exclude !== undefined &&
      filter.exclude.length > 0 &&
      filter.exclude.some((filter) => {
        return doesZeduxLoggerNodeFilterMatch(filter, node);
      });

    if (!isExcluded) {
      const isIncluded =
        filter.include === undefined ||
        filter.include.length <= 0 ||
        filter.include.some((filter) => {
          return doesZeduxLoggerNodeFilterMatch(filter, node);
        });

      if (isIncluded) {
        return filter.options;
      }
    }
  }
}
