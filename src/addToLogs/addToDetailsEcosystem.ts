import { deobfuscateEcosystem } from '../deobfuscate/deobfuscateEcosystem.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsEcosystem(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    what: { ecosystem },
    options: {
      showInDetails: { showEcosystem },
      deobfuscateSingleLetters,
      deobfuscateSingleLettersOptions,
    },
  } = args;

  if (!showEcosystem) {
    return;
  }

  addLogToDetails({
    emoji: '🌍',
    log: 'ecosystem',
    data:
      deobfuscateSingleLetters &&
      deobfuscateSingleLettersOptions.deobfuscateEcosystem
        ? deobfuscateEcosystem(ecosystem)
        : ecosystem,
  });
}
