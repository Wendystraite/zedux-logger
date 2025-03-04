import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosObserver(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { observer },
    options,
  } = args;

  if (!options.showObserver || observer === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '🔗',
    log: 'observer',
    data: options.deobfuscateNode ? deobfuscateNode(observer) : observer,
  });
}
