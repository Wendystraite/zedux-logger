import { deobfuscateEvent } from '../deobfuscate/deobfuscateEvent.js';
import type { LogArgs } from './LogArgs.js';

export function logEvent(args: LogArgs): void {
  const {
    what: { event },
    options,
  } = args;

  if (!options.showEvent || event === undefined) {
    return;
  }

  options.console.log(
    `📢 event(${event.type})`,
    options.deobfuscateEvent ? deobfuscateEvent(event) : event,
  );
}
