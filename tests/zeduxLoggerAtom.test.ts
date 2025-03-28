import { atom, createEcosystem } from '@zedux/atoms';
import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { addZeduxLogger } from '../src/addZeduxLogger';
import { getZeduxLoggerEcosystemStorage } from '../src/storage/getZeduxLoggerEcosystemStorage';
import type { CompleteZeduxLoggerLocalOptions } from '../src/types/ZeduxLoggerLocalOptions';
import { zeduxLoggerAtom } from '../src/zeduxLoggerAtom';

describe('zeduxLoggerAtom', () => {
  let ecosystem: ReturnType<typeof createEcosystem>;
  let consoleMock: Record<
    keyof CompleteZeduxLoggerLocalOptions['console'],
    Mock
  >;

  beforeEach(() => {
    ecosystem = createEcosystem({ id: 'test-ecosystem' });
    consoleMock = {
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      group: vi.fn(),
      groupCollapsed: vi.fn(),
      groupEnd: vi.fn(),
    };
  });
  afterEach(() => {
    ecosystem.reset({ hydration: true, listeners: true, overrides: true });
  });

  it('should have an undefined value if no logger is added', () => {
    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);
    const storage = zeduxLoggerAtomInstance.getOnce();
    expect(storage).toBeUndefined();
  });

  it('should have a defined value if a logger is added before', () => {
    addZeduxLogger(ecosystem, {
      options: {
        showColors: true,
        oneLineLogs: true,
        console: consoleMock,
      },
    });
    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);
    const storage = zeduxLoggerAtomInstance.getOnce();
    expect(storage).toBeDefined();
    expect(storage).toEqual(getZeduxLoggerEcosystemStorage(ecosystem));
  });

  it('should have a defined value if a logger is added after', () => {
    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);

    addZeduxLogger(ecosystem, {
      options: {
        showColors: true,
        oneLineLogs: true,
        console: consoleMock,
      },
    });

    const storage = zeduxLoggerAtomInstance.getOnce();
    expect(storage).toBeDefined();
    expect(storage).toEqual(getZeduxLoggerEcosystemStorage(ecosystem));
  });

  it('should have an undefined value if the logger is cleaned', () => {
    const cleanup = addZeduxLogger(ecosystem, {
      options: {
        showColors: true,
        oneLineLogs: true,
        console: consoleMock,
      },
    });

    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);
    expect(zeduxLoggerAtomInstance.getOnce()).toBeDefined();

    cleanup();

    expect(zeduxLoggerAtomInstance.getOnce()).toBeUndefined();
  });

  it('should set new options using setOptions', () => {
    addZeduxLogger(ecosystem, {
      options: {
        showColors: true,
        oneLineLogs: true,
        console: consoleMock,
        eventsToShow: ['change'],
      },
    });
    const node = ecosystem.getNode(atom('simple atom', 0));
    node.set(1);
    expect(consoleMock.log.mock.calls).toEqual([
      [
        '%c[✏️] %csimple atom%c%c%c%c %cchanged %cfrom %c0 %cto %c1',
        'color: #6b7280',
        'color: inherit',
        'color: #6b7280',
        'color: #6b7280',
        'color: #6b7280',
        'color: #6b7280',
        'color: #22c55e',
        'color: #6b7280',
        'color: inherit',
        'color: #6b7280',
        'color: inherit',
        expect.any(Object),
      ],
    ]);
    consoleMock.log.mockClear();

    ecosystem.getNode(zeduxLoggerAtom).exports.setOptions((oldOptions) => ({
      ...oldOptions,
      options: {
        ...oldOptions?.options,
        showColors: false,
      },
    }));
    node.set(2);
    expect(consoleMock.log.mock.calls).toEqual([
      [
        '[✏️] @signal(zeduxLogger)-1 changed from [Circular] to [Circular]',
        expect.any(Object),
      ],
      [
        '[✏️] zeduxLogger changed from [Circular] to [Circular]',
        expect.any(Object),
      ],
      ['[✏️] simple atom changed from 1 to 2', expect.any(Object)],
    ]);

    expect(consoleMock.warn.mock.calls).toEqual([]);
    expect(consoleMock.error.mock.calls).toEqual([]);
    expect(consoleMock.group.mock.calls).toEqual([]);
    expect(consoleMock.groupCollapsed.mock.calls).toEqual([]);
    expect(consoleMock.groupEnd.mock.calls).toEqual([]);
  });

  it('should throw when changing options if a logger is not added', () => {
    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);
    expect(() => {
      zeduxLoggerAtomInstance.exports.setOptions({
        options: { showColors: false },
      });
    }).toThrow(
      'Cannot set options for zedux-logger because it has not been added to the ecosystem. Did you forget to call addZeduxLogger() ?',
    );
    expect(getZeduxLoggerEcosystemStorage(ecosystem)).toBeUndefined();
  });

  it('should be able to toggle the logger on and off', () => {
    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);

    addZeduxLogger(ecosystem, {
      options: {
        showColors: false,
        oneLineLogs: true,
        console: consoleMock,
        enabled: false,
      },
    });

    ecosystem.getNode(atom('simple atom 1', 0));
    expect(consoleMock.log.mock.calls).toEqual([]);

    zeduxLoggerAtomInstance.exports.setOptions((oldOptions) => ({
      ...oldOptions,
      options: {
        ...oldOptions?.options,
        enabled: true,
      },
    }));

    ecosystem.getNode(atom('simple atom 2', 0));
    expect(consoleMock.log.mock.calls).toEqual([
      [
        '[✏️] @signal(zeduxLogger)-1 changed from {"originalOptions":{"options":{"showColors":false,… to [Circular]',
        expect.any(Object),
      ],
      [
        '[✏️] zeduxLogger changed from {"originalOptions":{"options":{"showColors":false,… to [Circular]',
        expect.any(Object),
      ],
      ['[⚡] simple atom 2 initialized to 0', expect.any(Object)],
    ]);

    zeduxLoggerAtomInstance.exports.setOptions((oldOptions) => ({
      ...oldOptions,
      options: {
        ...oldOptions?.options,
        enabled: false,
      },
    }));

    consoleMock.log.mockClear();
    ecosystem.getNode(atom('simple atom 3', 0));
    expect(consoleMock.log.mock.calls).toEqual([]);
  });

  it('should log the new options if debugOptions.logOptions is true', () => {
    const zeduxLoggerAtomInstance = ecosystem.getNode(zeduxLoggerAtom);

    addZeduxLogger(ecosystem, {
      options: {
        showColors: true,
        oneLineLogs: true,
        console: consoleMock,
        debugOptions: { logOptions: true },
      },
    });

    expect(consoleMock.log.mock.calls).toEqual([
      [
        'Zedux Logger options for',
        'test-ecosystem',
        'initialized to',
        getZeduxLoggerEcosystemStorage(ecosystem),
      ],
    ]);

    consoleMock.log.mockClear();

    zeduxLoggerAtomInstance.exports.setOptions((oldOptions) => ({
      ...oldOptions,
      options: {
        ...oldOptions?.options,
        showColors: false,
      },
    }));

    expect(consoleMock.log.mock.calls).toEqual([
      [
        'Zedux Logger options for',
        'test-ecosystem',
        'changed to',
        getZeduxLoggerEcosystemStorage(ecosystem),
      ],
      [
        '[✏️] @signal(zeduxLogger)-1 changed from {"originalOptions":{"options":{"showColors":true,"… to [Circular]',
        expect.any(Object),
      ],
      [
        '[✏️] zeduxLogger changed from {"originalOptions":{"options":{"showColors":true,"… to [Circular]',
        expect.any(Object),
      ],
    ]);
  });
});
