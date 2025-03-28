import { afterEach, describe, expect, it, vi } from 'vitest';

import { logLogArgs } from '../src/log/logLogArgs';

describe('logLogArgs', () => {
  const consoleMock = {
    log: vi.spyOn(console, 'log').mockImplementation(() => undefined),
    warn: vi.spyOn(console, 'warn').mockImplementation(() => undefined),
    error: vi.spyOn(console, 'error').mockImplementation(() => undefined),
    group: vi.spyOn(console, 'group').mockImplementation(() => undefined),
    groupCollapsed: vi
      .spyOn(console, 'groupCollapsed')
      .mockImplementation(() => undefined),
    groupEnd: vi.spyOn(console, 'groupEnd').mockImplementation(() => undefined),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call console.log with correct parameters', () => {
    logLogArgs({
      options: { console, oneLineLogs: false, showColors: true },
      logSummary: '%cTest %cSummary',
      logSummaryColors: ['#f00', '#0f0'],
      details: [],
    });

    expect(consoleMock.log.mock.calls).toEqual([
      ['%cTest %cSummary', 'color: #f00', 'color: #0f0'],
    ]);
  });

  it('should call console.log for each detail', () => {
    logLogArgs({
      options: { console, oneLineLogs: false, showColors: true },
      logSummary: 'Test Summary',
      logSummaryColors: [],
      details: [
        { log: 'info1', data: 'data1' },
        { log: 'info2', data: { some: 'data2' } },
      ],
    });

    expect(consoleMock.groupCollapsed.mock.calls).toEqual([['Test Summary']]);
    expect(consoleMock.log.mock.calls).toEqual([
      ['info1', 'data1'],
      ['info2', { some: 'data2' }],
    ]);
    expect(consoleMock.groupEnd.mock.calls).toEqual([[]]);
  });

  it('should work with nested details', () => {
    logLogArgs({
      options: { console, oneLineLogs: false, showColors: true },
      logSummary: 'Test Summary',
      logSummaryColors: [],
      details: [
        { log: 'info1', data: 'data1' },
        {
          log: 'info2',
          subLogs: [{ log: 'subInfo1', data: { subDataValue: 'subData1' } }],
        },
      ],
    });

    expect(consoleMock.groupCollapsed.mock.calls).toEqual([['Test Summary']]);
    expect(consoleMock.group.mock.calls).toEqual([['info2']]);
    expect(consoleMock.log.mock.calls).toEqual([
      ['info1', 'data1'],
      ['subInfo1', { subDataValue: 'subData1' }],
    ]);
    expect(consoleMock.groupEnd.mock.calls).toEqual([[], []]);
  });
});
