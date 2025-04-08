import { type ParsedAtomNodeId, parseAtomNodeId } from './parseAtomNodeId.js';
import {
  type ParsedBuiltInNodeId,
  parseBuiltInNodeId,
} from './parseBuiltInNodeId.js';

export type ParsedNodeId =
  | ParsedAtomNodeId
  | (ParsedBuiltInNodeId & {
      /**
       * The sub-node of the built-in node.
       * Only present if the built-in node is a signal or a listener.
       */
      subNode?: ParsedNodeId;
    });

/**
 * Parses a node ID into its constituent parts.
 */
export function parseNodeId(fullAtomName: string): ParsedNodeId;
export function parseNodeId(
  fullAtomName: string | undefined,
): ParsedNodeId | undefined;

export function parseNodeId(
  fullAtomName: string | undefined,
): ParsedNodeId | undefined {
  if (fullAtomName === undefined) {
    return undefined;
  }
  if (fullAtomName.startsWith('@')) {
    const parsed = parseBuiltInNodeId(fullAtomName);
    if (parsed !== undefined) {
      if (
        parsed.type === '@signal' ||
        parsed.type === '@listener' ||
        parsed.type === '@memo'
      ) {
        const subNode = parseNodeId(parsed.wrapped);
        Object.assign(parsed, { subNode });
      }
      return parsed as ParsedNodeId;
    }
  }
  return parseAtomNodeId(fullAtomName);
}
