import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { addAllBuiltInLoggersToDetails } from './addAllBuiltInLoggersToDetails.js';
import { addAllBuiltInLoggersToSummary } from './addAllBuiltInLoggersToSummary.js';

export function addAllBuiltInLoggers(logArgs: ZeduxLoggerLogArgs): void {
  addAllBuiltInLoggersToSummary(logArgs);
  addAllBuiltInLoggersToDetails(logArgs);
}
