const ATOM_REGEX =
  /^(?<name>.+?)(?:-\[(?<params>.*)\])?(?:-@scope\((?<scope>.+)\))?$/;

export interface ParsedAtomNodeId {
  id: string;
  type: '@atom';
  name: string;
  params: string | undefined;
  scope: string | undefined;
}

/**
 * Parses an atom node ID into its constituent parts.
 */
export function parseAtomNodeId(
  atomNodeId: string,
): ParsedAtomNodeId | undefined {
  const match = ATOM_REGEX.exec(atomNodeId);

  if (match === null) {
    return undefined;
  }

  const { name, params, scope } = match.groups as {
    name: string;
    params: string | undefined;
    scope: string | undefined;
  };

  return { id: atomNodeId, type: '@atom', name, scope, params };
}
