import { deobfuscateEvent } from '../deobfuscate/deobfuscateEvent.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsEvent(args: ZeduxLoggerLogArgs): void {
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
