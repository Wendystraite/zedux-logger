import { deobfuscateNode } from '../deobfuscate/deobfuscateNode.js';
import type { LogArgs } from './LogArgs.js';

export function logObserver(args: LogArgs): void {
  const {
    what: { observer },
    options,
  } = args;

  if (!options.showObserver || observer === undefined) {
    return;
  }

  options.console.log(
    '🔗 observer',
    options.deobfuscateNode ? deobfuscateNode(observer) : observer,
  );
}
