import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosObserver(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { observer },
    options: {
      showInDetails: { showObserver },
      deobfuscateSingleLetters,
    },
  } = args;

  if (!showObserver || observer === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '🔗',
    log: 'observer',
    data: deobfuscateSingleLetters.node ? deobfuscateNode(observer) : observer,
  });
}
