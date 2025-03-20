import type { AnyAtomTemplate, ZeduxNode } from '@zedux/react';

import type { ZeduxLoggerNodeFilter } from './types/ZeduxLoggerNodeFilter.js';

export function doesZeduxLoggerNodeFilterMatch(
  filter: ZeduxLoggerNodeFilter,
  node: ZeduxNode,
): boolean {
  if (typeof filter === 'string') {
    return node.id === filter;
  } else if (filter instanceof RegExp) {
    return filter.test(node.id);
  } else if ('tag' in filter) {
    const tags = (node.t as AnyAtomTemplate | undefined)?.tags;
    if (tags !== undefined) {
      const tagToExclude = filter.tag;
      if (typeof tagToExclude === 'string') {
        return tags.includes(tagToExclude);
      } else {
        return tags.some((tag) => tagToExclude.test(tag));
      }
    }
    return false;
  } else if ('type' in filter) {
    if (filter.type === '@atom') {
      return !node.id.startsWith('@');
    } else {
      return node.id.startsWith('@') && node.id.includes(filter.type);
    }
  } else {
    const nodeTemplateKey = (node.t as AnyAtomTemplate | undefined)?.key;
    const filterKey = (filter as AnyAtomTemplate | undefined)?.key;
    return (
      (nodeTemplateKey !== undefined && nodeTemplateKey === filterKey) ||
      filter === node.t
    );
  }
}
