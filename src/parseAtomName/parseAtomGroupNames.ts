import { parseAtomName } from './parseAtomName.js';

/**
 * Extracts group names from an atom name for organizing in hierarchical structures.
 * @param id The atom ID to parse
 * @returns Array of hierarchical group names
 */
export function parseAtomGroupNames(fullAtomName: string): string[] {
  const names = parseAtomName(fullAtomName);

  if (names.type === 'component') {
    return [`@@rc`, names.componentName, names.componentUid];
  }

  if (names.type === 'selector') {
    return [`@@selector`, names.selectorName, names.selectorUid];
  }

  if (names.type === 'listener') {
    return [`@@listener`, names.listenerUid];
  }

  // UserAtom or SignalAtom
  const { namespaces, params } = names;
  const groupNames = [...namespaces];

  if (params !== undefined) {
    groupNames.push(params);
  }

  if (names.type === 'signal') {
    groupNames.push(`@signal-${names.signalUid}`);
  } else if (names.scope !== undefined) {
    groupNames.push(`@@scope-${names.scope}`);
  }

  return groupNames;
}
