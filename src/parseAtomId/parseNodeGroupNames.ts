import { type ParsedNodeId, parseNodeId } from './parseNodeId.js';

/**
 * Extracts group names from an atom name for organizing in hierarchical structures.
 * @param id The atom ID to parse
 * @returns Array of hierarchical group names
 */
export function parseNodeGroupNames(fullAtomName: string): string[] {
  const parsedNodeId = parseNodeId(fullAtomName);
  return getParsedNodeIdGroupNames(parsedNodeId);
}

export function getParsedNodeIdGroupNames(
  parsedNodeId: ParsedNodeId,
  groupNames: string[] = [],
): string[] {
  if (parsedNodeId.type === '@atom') {
    const { name, params, scope } = parsedNodeId;
    const namespaces = name.split('/');
    if (namespaces.length > 0) {
      groupNames.push(...namespaces);
    }
    if (params !== undefined) {
      groupNames.push(`[${params}]`);
    }
    if (scope !== undefined) {
      groupNames.push(`@scope-${scope}`);
    }
  } else {
    const { type, wrapped, suffix, subNode } = parsedNodeId;
    if (subNode !== undefined) {
      getParsedNodeIdGroupNames(subNode, groupNames);
      if (suffix !== '') {
        groupNames.push(`${type}-${suffix}`);
      } else {
        groupNames.push(type);
      }
    } else {
      groupNames.push(type);
      if (wrapped !== '') {
        groupNames.push(wrapped);
      }
      if (suffix !== '') {
        groupNames.push(suffix);
      }
    }
  }
  return groupNames;
}
