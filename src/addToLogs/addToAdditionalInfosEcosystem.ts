import { deobfuscateEcosystem } from '../deobfuscate/deobfuscateEcosystem.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosEcosystem(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { ecosystem },
    options,
  } = args;

  if (!options.showEcosystem) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '🌍',
    log: 'ecosystem',
    data: options.deobfuscateEcosystem
      ? deobfuscateEcosystem(ecosystem)
      : ecosystem,
  });
}
