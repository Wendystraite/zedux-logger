import { deobfuscateReasons } from '../deobfuscate/deobfuscateEvent.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsReasons(args: ZeduxLoggerLogArgs): void {
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
