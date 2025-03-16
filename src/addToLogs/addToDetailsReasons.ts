import { deobfuscateReasons } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsReasons(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { reasons },
    options: {
      showInDetails: { showReasons },
      deobfuscateSingleLetters,
      deobfuscateSingleLettersOptions,
    },
  } = args;

  if (!showReasons || reasons === undefined) {
    return;
  }

  if (reasons.length <= 0) {
    addLogToDetails({
      emoji: '💡',
      log: '(no reasons)',
    });
  } else {
    addLogToDetails({
      emoji: '💡',
      log: 'reasons',
      data:
        deobfuscateSingleLetters &&
        deobfuscateSingleLettersOptions.deobfuscateReasons
          ? deobfuscateReasons(reasons)
          : reasons,
    });
  }
}
