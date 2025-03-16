import { deobfuscateEcosystem } from '../deobfuscate/deobfuscateEcosystem.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsEcosystem(args: LogArgs): void {
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
