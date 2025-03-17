import type { Ecosystem } from '@zedux/react';

import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import { ZEDUX_LOGGER_ECOSYSTEM_STORAGE_KEY } from './ecosystem-storage-key.js';

export function getZeduxLoggerEcosystemStorage(
  ecosystem: Ecosystem,
): ZeduxLoggerEcosystemStorage | undefined {
  return ecosystem._storage[ZEDUX_LOGGER_ECOSYSTEM_STORAGE_KEY] as
    | ZeduxLoggerEcosystemStorage
    | undefined;
}
