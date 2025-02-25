import { deobfuscateEcosystem } from '../deobfuscate/deobfuscateEcosystem.js';
import type { LogArgs } from './LogArgs.js';

export function logEcosystem(args: LogArgs): void {
  const {
    what: { ecosystem },
    options,
  } = args;

  if (!options.showEcosystem) {
    return;
  }

  options.console.log(
    '🌍 ecosystem',
    options.deobfuscateEcosystem ? deobfuscateEcosystem(ecosystem) : ecosystem,
  );
}
