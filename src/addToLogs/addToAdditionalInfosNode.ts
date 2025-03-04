import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosNode(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { node },
    options,
  } = args;

  if (!options.showNode || node === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '🔗',
    log: 'node',
    data: options.deobfuscateNode ? deobfuscateNode(node) : node,
  });
}
