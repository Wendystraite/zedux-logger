import { deobfuscateReasons } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function logReasons(args: LogArgs): void {
  const {
    what: { reasons },
    options,
  } = args;

  if (!options.showReasons || reasons === undefined) {
    return;
  }

  if (reasons.length <= 0) {
    options.console.log('💡 (no reasons)');
  } else {
    options.console.log(
      '💡 reasons',
      options.deobfuscateReasons ? deobfuscateReasons(reasons) : reasons,
    );
  }
}
