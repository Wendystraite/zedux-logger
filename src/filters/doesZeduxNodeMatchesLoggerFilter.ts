import type {
  AnyAtomTemplate,
  NodeType,
  SelectorTemplate,
  ZeduxNode,
} from '@zedux/react';

import type { ZeduxLoggerNodeFilter } from '../types/ZeduxLoggerNodeFilter.js';

export function doesZeduxNodeMatchesLoggerFilter(
  node: ZeduxNode,
  filter: ZeduxLoggerNodeFilter,
): boolean {
  if (filter === '@atom' || (typeof filter === 'object' && 'type' in filter)) {
    // Node's type
    return doesZeduxLoggerNodeFilterMatchByNodeType(
      typeof filter === 'string'
        ? [filter]
        : Array.isArray(filter.type)
          ? filter.type
          : [filter.type],
      node,
    );
  } else if (
    typeof filter === 'string' ||
    filter instanceof RegExp ||
    'idMatch' in filter
  ) {
    // Node's id (weakly match) or node's type passed as string
    return doesZeduxLoggerNodeFilterMatchWeaklyByNodeId(
      typeof filter === 'string' || filter instanceof RegExp
        ? [filter]
        : Array.isArray(filter.idMatch)
          ? filter.idMatch
          : [filter.idMatch],
      node,
    );
  } else if ('idEqual' in filter) {
    // Node's id (strictly match)
    return doesZeduxLoggerNodeFilterMatchByNodeName(
      Array.isArray(filter.idEqual) ? filter.idEqual : [filter.idEqual],
      node,
    );
  } else if ('tag' in filter) {
    // Tag
    return doesZeduxLoggerNodeFilterMatchByTag(
      Array.isArray(filter.tag) ? filter.tag : [filter.tag],
      node,
    );
  } else {
    // Template
    return doesZeduxLoggerNodeFilterMatchByTemplate(
      Array.isArray(filter.template) ? filter.template : [filter.template],
      node,
    );
  }
}

function doesZeduxLoggerNodeFilterMatchWeaklyByNodeId(
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  filtersWeaklyByNodeIdOrType: Array<string | RegExp | NodeType>,
  node: ZeduxNode,
): boolean {
  const lowerCaseNodeId = node.id.toLowerCase();
  for (const filterWeaklyByNodeIdOrType of filtersWeaklyByNodeIdOrType) {
    if (typeof filterWeaklyByNodeIdOrType === 'string') {
      if (lowerCaseNodeId.includes(filterWeaklyByNodeIdOrType.toLowerCase())) {
        return true;
      }
    } else {
      if (filterWeaklyByNodeIdOrType.test(node.id)) {
        return true;
      }
    }
  }
  return false;
}

function doesZeduxLoggerNodeFilterMatchByNodeName(
  filtersByNodeId: string[],
  node: ZeduxNode,
): boolean {
  return filtersByNodeId.includes(node.id);
}

function doesZeduxLoggerNodeFilterMatchByNodeType(
  filtersByNodeType: NodeType[],
  node: ZeduxNode,
): boolean {
  const lowerCaseNodeId = node.id.toLowerCase();
  for (const filterByNodeType of filtersByNodeType) {
    if (filterByNodeType === '@atom') {
      if (!lowerCaseNodeId.startsWith('@')) {
        return true;
      }
    } else {
      if (lowerCaseNodeId.includes(filterByNodeType)) {
        return true;
      }
    }
  }
  return false;
}

function doesZeduxLoggerNodeFilterMatchByTag(
  filtersByTag: Array<string | RegExp>,
  node: ZeduxNode,
): boolean {
  const nodeTags = (node.t as AnyAtomTemplate | undefined)?.tags;
  if (nodeTags !== undefined) {
    for (const filterByTag of filtersByTag) {
      if (typeof filterByTag === 'string') {
        if (nodeTags.includes(filterByTag)) {
          return true;
        }
      } else {
        if (nodeTags.some((tag) => filterByTag.test(tag))) {
          return true;
        }
      }
    }
  }
  return false;
}

function doesZeduxLoggerNodeFilterMatchByTemplate(
  filtersTemplate: Array<AnyAtomTemplate | SelectorTemplate>,
  node: ZeduxNode,
): boolean {
  for (const filterTemplate of filtersTemplate) {
    const nodeTemplateKey = (node.t as AnyAtomTemplate | undefined)?.key;
    const filterKey = (filterTemplate as AnyAtomTemplate | undefined)?.key;
    if (
      (nodeTemplateKey !== undefined && nodeTemplateKey === filterKey) ||
      filterTemplate === node.t
    ) {
      return true;
    }
  }
  return false;
}
