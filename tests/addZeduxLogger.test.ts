import { atom, createEcosystem } from '@zedux/react';
import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { addZeduxLogger } from '../src/addZeduxLogger.js';
import type { ZeduxLoggerOptions } from '../src/types/ZeduxLoggerOptions.js';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('addZeduxLogger', () => {
  let ecosystem: ReturnType<typeof createEcosystem>;

  beforeEach(() => {
    ecosystem = createEcosystem({ id: 'test-ecosystem' });
  });
  afterEach(() => {
    ecosystem.reset({ hydration: true, listeners: true, overrides: true });
  });

  let consoleMock: Record<
    keyof NonNullable<ZeduxLoggerOptions['console']>,
    Mock
  >;
  beforeEach(() => {
    consoleMock = {
      log: vi.fn(),
      warn: vi.fn(),
      group: vi.fn(),
      groupCollapsed: vi.fn(),
      groupEnd: vi.fn(),
    };
  });

  it('should log without colors', () => {
    addZeduxLogger(ecosystem, {
      console: consoleMock,
      showColors: false,
      oneLineLogs: true,
    });

    ecosystem.getNode(atom('simple atom', 0));

    expect(consoleMock.warn).not.toHaveBeenCalled();
    expect(consoleMock.group).not.toHaveBeenCalled();
    expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
    expect(consoleMock.groupEnd).not.toHaveBeenCalled();

    expect(consoleMock.log).toHaveBeenCalledTimes(1);
    expect(consoleMock.log.mock.calls).toMatchObject([
      [
        ' [⚡] simple atom initialized to 0',
        {
          '➡️ new-state': 0,
          '🌍 ecosystem': {},
          '📈 graph.bottom-up': {},
          '📈 graph.by-namespaces': {},
          '📈 graph.flat': {},
          '📈 graph.top-down': {},
          '📢 event(cycle)': {},
          '📸 snapshot.new-snapshot': {},
          '🔗 node': {},
          '🔗 observers': {},
          '🔗 sources': {},
        },
      ],
    ]);
  });
});
