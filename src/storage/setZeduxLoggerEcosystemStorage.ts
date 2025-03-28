import type { Ecosystem } from '@zedux/react';

import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import { ZEDUX_LOGGER_ECOSYSTEM_STORAGE_KEY } from './ecosystem-storage-key.js';

export function setZeduxLoggerEcosystemStorage(
  ecosystem: Ecosystem,
  storage: ZeduxLoggerEcosystemStorage | undefined,
): void {
  ecosystem._storage[ZEDUX_LOGGER_ECOSYSTEM_STORAGE_KEY] = storage;
}
