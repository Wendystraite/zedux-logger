import { deobfuscateEvent } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosEvent(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { event },
    options: {
      showInDetails: { showEvent },
      deobfuscateSingleLetters,
    },
  } = args;

  if (!showEvent || event === undefined) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '📢',
    log: `event(${event.type})`,
    data: deobfuscateSingleLetters.event ? deobfuscateEvent(event) : event,
  });
}
