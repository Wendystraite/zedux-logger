import type { NodeType } from '@zedux/react';

const BUILT_IN_NODE_REGEX =
  /^(?<type>@.+?)\({1}(?<wrapped>.*)\)(?:-(?<suffix>.*))?/;

export interface ParsedBuiltInNodeId {
  id: string;
  type: Exclude<NodeType, '@atom'>;
  wrapped: string;
  suffix: string;
}

/**
 * Parses a built-in node ID into its constituent parts.
 */
export function parseBuiltInNodeId(
  fullAtomName: string,
): ParsedBuiltInNodeId | undefined {
  const match = BUILT_IN_NODE_REGEX.exec(fullAtomName);

  if (match === null) {
    return undefined;
  }

  const { type, wrapped, suffix } = match.groups as {
    type: Exclude<NodeType, '@atom'>;
    wrapped: string;
    suffix: string;
  };

  return { id: fullAtomName, type, wrapped, suffix };
}
