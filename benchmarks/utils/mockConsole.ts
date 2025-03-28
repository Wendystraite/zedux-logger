import { forEach, values } from 'remeda';
import { vi } from 'vitest';

import type { CompleteZeduxLoggerLocalOptions } from '../../src/types/ZeduxLoggerLocalOptions';

const TO_MOCK: {
  [K in keyof CompleteZeduxLoggerLocalOptions['console']]: K;
} = {
  log: 'log',
  warn: 'warn',
  error: 'error',
  group: 'group',
  groupCollapsed: 'groupCollapsed',
  groupEnd: 'groupEnd',
};

export function mockConsole() {
  forEach(values(TO_MOCK), (method) => {
    vi.spyOn(console, method).mockImplementation(() => undefined);
  });
}
