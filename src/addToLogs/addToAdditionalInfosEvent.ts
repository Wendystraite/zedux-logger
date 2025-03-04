import { deobfuscateEvent } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosEvent(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { event },
    options,
  } = args;

  if (!options.showEvent || event === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '📢',
    log: `event(${event.type})`,
    data: options.deobfuscateEvent ? deobfuscateEvent(event) : event,
  });
}
