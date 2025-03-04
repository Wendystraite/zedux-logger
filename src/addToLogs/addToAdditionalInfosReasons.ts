import { deobfuscateReasons } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosReasons(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { reasons },
    options: {
      showInDetails: { showReasons },
      deobfuscateSingleLetters,
    },
  } = args;

  if (!showReasons || reasons === undefined) {
    return;
  }

  if (reasons.length <= 0) {
    addLogToAdditionalInfos({
      emoji: '💡',
      log: '(no reasons)',
    });
  } else {
    addLogToAdditionalInfos({
      emoji: '💡',
      log: 'reasons',
      data: deobfuscateSingleLetters.reasons
        ? deobfuscateReasons(reasons)
        : reasons,
    });
  }
}
