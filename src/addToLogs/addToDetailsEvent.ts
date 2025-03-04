import { deobfuscateEvent } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsEvent(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { event },
    options: {
      showInDetails: { showEvent },
      deobfuscateSingleLetters,
    },
  } = args;

  if (!showEvent || event === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '📢',
    log: `event(${event.type})`,
    data: deobfuscateSingleLetters.event ? deobfuscateEvent(event) : event,
  });
}
