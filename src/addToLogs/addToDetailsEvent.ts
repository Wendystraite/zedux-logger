import { deobfuscateEvent } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsEvent(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { event },
    options: {
      showInDetails: { showEvent },
      deobfuscateSingleLetters,
      deobfuscateSingleLettersOptions,
    },
  } = args;

  if (!showEvent || event === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '📢',
    log: `event(${event.type})`,
    data:
      deobfuscateSingleLetters &&
      deobfuscateSingleLettersOptions.deobfuscateEvents
        ? deobfuscateEvent(event)
        : event,
  });
}
