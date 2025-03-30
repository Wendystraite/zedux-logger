import type { EcosystemEvents } from '@zedux/atoms';

import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';

export function calculateExecutionTime(
  eventMap: Partial<EcosystemEvents>,
  storage: ZeduxLoggerEcosystemStorage,
): number | undefined {
  if (storage.calculateExecutionTime) {
    if (eventMap.runStart) {
      const startTime = performance.now();
      storage.runStartTimeMapping.set(eventMap.runStart.source, startTime);
    } else if (eventMap.runEnd) {
      const startTime = storage.runStartTimeMapping.get(eventMap.runEnd.source);
      storage.runStartTimeMapping.delete(eventMap.runEnd.source);
      if (startTime !== undefined) {
        const endTime = performance.now();
        return endTime - startTime;
      }
    }
  }
}
