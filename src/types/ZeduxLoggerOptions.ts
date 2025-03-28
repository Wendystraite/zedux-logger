import type { ZeduxLoggerBuiltInTemplateKey } from './ZeduxLoggerBuiltInTemplateKey.js';
import type { ZeduxLoggerFilter } from './ZeduxLoggerFilter.js';
import type { ZeduxLoggerGlobalOptions } from './ZeduxLoggerGlobalOptions.js';
import type { ZeduxLoggerLocalOptions } from './ZeduxLoggerLocalOptions.js';
import type { ZeduxLoggerMergedOptions } from './ZeduxLoggerMergedOptions.js';

/**
 * Options given to the Zedux logger.
 */
export interface ZeduxLoggerOptions<TEMPLATE_KEY extends string = string> {
  /**
   * Custom templates to use in the logger in the `templates` property.
   *
   * The key is the name of the template and the value is the zedux logger's options.
   */
  customTemplates?: Record<
    TEMPLATE_KEY,
    | ZeduxLoggerMergedOptions
    | ZeduxLoggerGlobalOptions
    | ZeduxLoggerLocalOptions
  >;

  /**
   * Templates to use in the logger globally.
   *
   * Is an array of keys of the templates to use.
   *
   * Templates are predefined group of options that can be applied either
   * globally or by filter.
   *
   * The order of the templates in the array is the order in which they will be
   * applied. Rightmost templates have higher priority.
   *
   * Priority of options :
   * - The local `filters.options` property has the highest priority.
   * - The local `filters.templates` property has the second highest priority.
   * - The global `options` property has the third highest priority.
   * - The global `templates` property has the fourth highest priority.
   *
   * Custom templates can be defined in the `customTemplates` property.
   */
  templates?: Array<ZeduxLoggerBuiltInTemplateKey | NoInfer<TEMPLATE_KEY>>;

  /**
   * Global options for the Zedux logger.
   * Theses options are shared between all the Zedux loggers.
   */
  options?: ZeduxLoggerMergedOptions;

  /**
   * Filters to apply to the logger.
   * Each filter can include or exclude nodes based on their name, type, template, or tag.
   * If a node matches an include filter, it will be logged.
   * If a node matches an exclude filter, it will not be logged.
   * If a node matches both an include and an exclude filter, it will not be logged.
   * If a node doesn't match any filter, it will be logged.
   */
  filters?: Array<ZeduxLoggerFilter<TEMPLATE_KEY>>;
}
