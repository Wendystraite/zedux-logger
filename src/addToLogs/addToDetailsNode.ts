import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsNode(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    what: { node },
    options: {
      showInDetails: { showNode },
      deobfuscateSingleLetters,
      deobfuscateSingleLettersOptions,
    },
  } = args;

  if (!showNode || node === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '🔗',
    log: 'node',
    data:
      deobfuscateSingleLetters &&
      deobfuscateSingleLettersOptions.deobfuscateGraphNodes
        ? deobfuscateNode(node)
        : node,
  });
}
