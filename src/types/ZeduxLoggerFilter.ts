import type { ZeduxLoggerBuiltInTemplateKey } from './ZeduxLoggerBuiltInTemplateKey.js';
import type { ZeduxLoggerLocalOptions } from './ZeduxLoggerLocalOptions.js';
import type { ZeduxLoggerNodeFilter } from './ZeduxLoggerNodeFilter.js';

export interface ZeduxLoggerFilter<TEMPLATE_KEY extends string = string> {
  /**
   * Templates to use in the logger locally.
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

  include?: ZeduxLoggerNodeFilter[];
  exclude?: ZeduxLoggerNodeFilter[];
  options?: ZeduxLoggerLocalOptions;
}
