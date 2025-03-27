import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsObserver(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    what: { observer },
    options: {
      showInDetails: { showObserver },
      deobfuscateSingleLetters,
      deobfuscateSingleLettersOptions,
    },
  } = args;

  if (!showObserver || observer === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '🔗',
    log: 'observer',
    data:
      deobfuscateSingleLetters &&
      deobfuscateSingleLettersOptions.deobfuscateGraphNodes
        ? deobfuscateNode(observer)
        : observer,
  });
}
