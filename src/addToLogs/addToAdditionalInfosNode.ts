import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosNode(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { node },
    options: {
      showInDetails: { showNode },
      deobfuscateSingleLetters,
    },
  } = args;

  if (!showNode || node === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '🔗',
    log: 'node',
    data: deobfuscateSingleLetters.node ? deobfuscateNode(node) : node,
  });
}
