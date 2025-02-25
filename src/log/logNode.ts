import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function logNode(args: LogArgs): void {
  const {
    what: { node },
    options,
  } = args;

  if (!options.showNode || node === undefined) {
    return;
  }

  options.console.log(
    '🔗 node',
    options.deobfuscateNode ? deobfuscateNode(node) : node,
  );
}
