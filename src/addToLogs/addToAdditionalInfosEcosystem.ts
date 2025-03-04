import { deobfuscateEcosystem } from '../deobfuscate/deobfuscateEcosystem.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosEcosystem(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { ecosystem },
    options: {
      showInDetails: { showEcosystem },
      deobfuscateSingleLetters,
    },
  } = args;

  if (!showEcosystem) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '🌍',
    log: 'ecosystem',
    data: deobfuscateSingleLetters.ecosystem
      ? deobfuscateEcosystem(ecosystem)
      : ecosystem,
  });
}
