import { DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS } from '../consts/default-zedux-logger-global-options.js';
import { DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS } from '../consts/default-zedux-logger-local-options.js';
import { DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS } from '../consts/default-zedux-logger-merged-options.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerGlobalOptions } from '../types/ZeduxLoggerGlobalOptions.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import type { CompleteZeduxLoggerMergedOptions } from '../types/ZeduxLoggerMergedOptions.js';
import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { defaults } from '../utils/defaults.js';

export function getDefaultZeduxLoggerEcosystemStorage(
  loggerOptions?: ZeduxLoggerOptions,
): ZeduxLoggerEcosystemStorage {
  const completeMergedOptions: CompleteZeduxLoggerMergedOptions = defaults(
    DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS,
    loggerOptions?.options ?? {},
  );

  const completeGlobalOptions: CompleteZeduxLoggerGlobalOptions = defaults(
    DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS,
    loggerOptions?.options ?? {},
  );

  const filters = (loggerOptions?.filters ?? []).map((filter) => {
    const completeLocalOptionsOfFilter: CompleteZeduxLoggerLocalOptions =
      defaults(
        defaults(
          DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS,
          loggerOptions?.options ?? {},
        ),
        filter.options ?? {},
      );
    return { ...filter, options: completeLocalOptionsOfFilter };
  });

  const showGraph = getIsOptionEnabledEitherGloballyOrLocallyOnce(
    filters,
    completeMergedOptions,
    (options) => options.showInDetails.showGraph,
  );

  const useIncrementalGraph =
    showGraph && completeMergedOptions.debugOptions.useIncrementalGraph;

  const useTopDownGraph =
    showGraph &&
    getIsOptionEnabledEitherGloballyOrLocallyOnce(
      filters,
      completeMergedOptions,
      (options) => options.graphOptions.showTopDownGraph,
    );

  const useBottomUpGraph =
    showGraph &&
    getIsOptionEnabledEitherGloballyOrLocallyOnce(
      filters,
      completeMergedOptions,
      (options) => options.graphOptions.showBottomUpGraph,
    );

  const useFlatGraph =
    showGraph &&
    getIsOptionEnabledEitherGloballyOrLocallyOnce(
      filters,
      completeMergedOptions,
      (options) => options.graphOptions.showFlatGraph,
    );

  const useByNamespacesGraph =
    showGraph &&
    getIsOptionEnabledEitherGloballyOrLocallyOnce(
      filters,
      completeMergedOptions,
      (options) => options.graphOptions.showByNamespacesGraph,
    );

  return {
    snapshot: undefined,
    graph: undefined,
    consistencyCheckTimeoutId: undefined,
    originalOptions: loggerOptions,
    completeMergedOptions,
    completeGlobalOptions,
    filters,
    runStartTimeMapping: new Map(),
    calculateGraph: showGraph,
    calculateIncrementalGraph: useIncrementalGraph,
    calculateTopDownGraph: useTopDownGraph,
    calculateBottomUpGraph: useBottomUpGraph,
    calculateFlatGraph: useFlatGraph,
    calculateByNamespacesGraph: useByNamespacesGraph,
  };
}

function getIsOptionEnabledEitherGloballyOrLocallyOnce(
  filters: ZeduxLoggerEcosystemStorage['filters'],
  mergedOptions: CompleteZeduxLoggerMergedOptions,
  getLocalOption: (option: CompleteZeduxLoggerLocalOptions) => boolean,
): boolean {
  if (filters.length <= 0) {
    return getLocalOption(mergedOptions);
  }
  return filters.some((filter) => getLocalOption(filter.options));
}
