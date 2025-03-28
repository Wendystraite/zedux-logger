import { ZEDUX_LOGGER_BUILT_IN_TEMPLATES } from '../consts/built-in-templates.js';
import { DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS } from '../consts/default-zedux-logger-global-options.js';
import { DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS } from '../consts/default-zedux-logger-local-options.js';
import { DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS } from '../consts/default-zedux-logger-merged-options.js';
import type { ZeduxLoggerBuiltInTemplateKey } from '../types/ZeduxLoggerBuiltInTemplateKey.js';
import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import type {
  CompleteZeduxLoggerGlobalOptions,
  ZeduxLoggerGlobalOptions,
} from '../types/ZeduxLoggerGlobalOptions.js';
import type {
  CompleteZeduxLoggerLocalOptions,
  ZeduxLoggerLocalOptions,
} from '../types/ZeduxLoggerLocalOptions.js';
import type {
  CompleteZeduxLoggerMergedOptions,
  ZeduxLoggerMergedOptions,
} from '../types/ZeduxLoggerMergedOptions.js';
import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { defaults } from '../utils/defaults.js';

export function getDefaultZeduxLoggerEcosystemStorage(
  loggerOptions?: ZeduxLoggerOptions,
): ZeduxLoggerEcosystemStorage {
  const completeMergedOptions = mergeAllTemplatesOptions({
    defaultOptions: DEFAULT_ZEDUX_LOGGER_MERGED_OPTIONS,
    customTemplates: loggerOptions?.customTemplates,
    templates: loggerOptions?.templates,
    options: loggerOptions?.options,
  });

  const completeGlobalOptions = mergeAllTemplatesOptions({
    defaultOptions: DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS,
    customTemplates: loggerOptions?.customTemplates,
    templates: loggerOptions?.templates,
    options: loggerOptions?.options,
  });

  const completeLocalOptions = mergeAllTemplatesOptions({
    defaultOptions: DEFAULT_ZEDUX_LOGGER_LOCAL_OPTIONS,
    customTemplates: loggerOptions?.customTemplates,
    templates: loggerOptions?.templates,
    options: loggerOptions?.options,
  });

  const filters = (loggerOptions?.filters ?? []).map((filter) => {
    const completeLocalOptionsOfFilter = mergeAllTemplatesOptions({
      defaultOptions: completeLocalOptions,
      customTemplates: loggerOptions?.customTemplates,
      templates: filter.templates,
      options: filter.options,
    });
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

  const showSnapshot = getIsOptionEnabledEitherGloballyOrLocallyOnce(
    filters,
    completeMergedOptions,
    (options) => options.showInDetails.showSnapshot,
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
    calculateSnapshot: showSnapshot,
  };
}

function mergeAllTemplatesOptions<
  COMPLETE_OPTION extends
    | CompleteZeduxLoggerMergedOptions
    | CompleteZeduxLoggerGlobalOptions
    | CompleteZeduxLoggerLocalOptions,
>({
  defaultOptions,
  customTemplates,
  templates,
  options,
}: {
  defaultOptions: COMPLETE_OPTION;
  templates: string[] | undefined;
  customTemplates:
    | Record<
        string,
        | ZeduxLoggerMergedOptions
        | ZeduxLoggerGlobalOptions
        | ZeduxLoggerLocalOptions
      >
    | undefined;
  options: ZeduxLoggerMergedOptions | undefined;
}): COMPLETE_OPTION {
  let completeMergedOptions =
    defaultOptions as CompleteZeduxLoggerMergedOptions;

  for (const template of templates ?? []) {
    const templateOptions: ZeduxLoggerMergedOptions | undefined =
      customTemplates?.[template] ??
      (template in ZEDUX_LOGGER_BUILT_IN_TEMPLATES
        ? ZEDUX_LOGGER_BUILT_IN_TEMPLATES[
            template as ZeduxLoggerBuiltInTemplateKey
          ]
        : undefined);
    if (templateOptions !== undefined) {
      completeMergedOptions = defaults(completeMergedOptions, templateOptions);
    }
  }

  completeMergedOptions = defaults(completeMergedOptions, options ?? {});

  return completeMergedOptions as COMPLETE_OPTION;
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
