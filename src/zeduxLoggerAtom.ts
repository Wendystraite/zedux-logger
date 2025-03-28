import { api, atom, injectEcosystem, injectSignal } from '@zedux/atoms';
import type { SetStateAction } from 'react';

import { getDefaultZeduxLoggerEcosystemStorage } from './storage/getDefaultZeduxLoggerEcosystemStorage.js';
import { getZeduxLoggerEcosystemStorage } from './storage/getZeduxLoggerEcosystemStorage.js';
import { setZeduxLoggerEcosystemStorage } from './storage/setZeduxLoggerEcosystemStorage.js';
import type { ZeduxLoggerBuiltInTemplateKey } from './types/ZeduxLoggerBuiltInTemplateKey.js';
import type { ZeduxLoggerEcosystemStorage } from './types/ZeduxLoggerEcosystemStorage.js';
import type { ZeduxLoggerOptions } from './types/ZeduxLoggerOptions.js';

export const zeduxLoggerAtom = atom('zeduxLogger', () => {
  const ecosystem = injectEcosystem();
  const storageSignal = injectSignal<ZeduxLoggerEcosystemStorage | undefined>(
    () => getZeduxLoggerEcosystemStorage(ecosystem),
  );
  return api(storageSignal).setExports({
    setOptions<TEMPLATE_KEY extends string = ZeduxLoggerBuiltInTemplateKey>(
      options: SetStateAction<ZeduxLoggerOptions<TEMPLATE_KEY> | undefined>,
    ): void {
      const oldStorage = getZeduxLoggerEcosystemStorage(ecosystem);

      if (oldStorage === undefined) {
        throw new Error(
          'Cannot set options for zedux-logger because it has not been added to the ecosystem. Did you forget to call addZeduxLogger() ?',
        );
      }

      const oldOptions = oldStorage.originalOptions as
        | ZeduxLoggerOptions<TEMPLATE_KEY>
        | undefined;

      const newOptions =
        typeof options === 'function' ? options(oldOptions) : options;
      const newStorage = getDefaultZeduxLoggerEcosystemStorage(newOptions);

      if (newStorage.completeMergedOptions.debugOptions.logOptions) {
        newStorage.completeMergedOptions.console.log(
          'Zedux Logger options for',
          ecosystem.id,
          'changed to',
          newStorage,
        );
      }

      setZeduxLoggerEcosystemStorage(ecosystem, newStorage);
      storageSignal.set(newStorage);
    },
  });
});
