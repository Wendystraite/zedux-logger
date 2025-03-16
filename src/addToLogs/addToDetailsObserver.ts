import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsObserver(args: LogArgs): void {
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
