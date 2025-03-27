import { describe, expect, it } from 'vitest';

import { flattenLogDetails } from '../src/log/flattenLogDetails';
import type { ZeduxLoggerLogDetail } from '../src/types/ZeduxLoggerLogArgs';

describe('flattenLogDetails', () => {
  it('should return empty object when given empty array', () => {
    expect(flattenLogDetails([])).toEqual({});
  });

  it('should flatten a single log detail', () => {
    const logDetails: ZeduxLoggerLogDetail[] = [
      {
        log: 'test',
        data: 'value',
      },
    ];

    expect(flattenLogDetails(logDetails)).toEqual({
      test: 'value',
    });
  });

  it('should handle emoji in log detail', () => {
    const logDetails: ZeduxLoggerLogDetail[] = [
      {
        log: 'test',
        emoji: '🚀',
        data: 'value',
      },
    ];

    expect(flattenLogDetails(logDetails)).toEqual({
      '🚀 test': 'value',
    });
  });

  it('should replace spaces with dashes', () => {
    const logDetails: ZeduxLoggerLogDetail[] = [
      {
        log: 'test log with spaces',
        data: 'value',
      },
    ];

    expect(flattenLogDetails(logDetails)).toEqual({
      'test-log-with-spaces': 'value',
    });
  });

  it('should strip %c formatting', () => {
    const logDetails: ZeduxLoggerLogDetail[] = [
      {
        log: '%cformatted %ctest',
        data: 'value',
      },
    ];

    expect(flattenLogDetails(logDetails)).toEqual({
      'formatted-test': 'value',
    });
  });

  it('should handle nested sublogs', () => {
    const logDetails: ZeduxLoggerLogDetail[] = [
      {
        log: 'parent',
        data: 'parentValue',
        subLogs: [
          {
            log: 'child',
            data: 'childValue',
          },
        ],
      },
    ];

    expect(flattenLogDetails(logDetails)).toEqual({
      parent: 'parentValue',
      'parent.child': 'childValue',
    });
  });

  it('should handle multiple nested levels with emoji', () => {
    const logDetails: ZeduxLoggerLogDetail[] = [
      {
        log: 'root',
        emoji: '📁',
        data: 'rootValue',
        subLogs: [
          {
            log: 'level1',
            emoji: '📌',
            data: 'level1Value',
            subLogs: [
              {
                log: 'level2',
                emoji: '⚡',
                data: 'level2Value',
              },
            ],
          },
        ],
      },
    ];

    expect(flattenLogDetails(logDetails)).toEqual({
      '📁 root': 'rootValue',
      '📁 root.📌 level1': 'level1Value',
      '📁 root.📌 level1.⚡ level2': 'level2Value',
    });
  });

  it('should ignore false or undefined log details', () => {
    const logDetails: Array<ZeduxLoggerLogDetail | false | undefined> = [
      {
        log: 'valid',
        data: 'value',
      },
      false,
      undefined,
      {
        log: 'another',
        data: 'data',
      },
    ] as ZeduxLoggerLogDetail[];

    expect(flattenLogDetails(logDetails as ZeduxLoggerLogDetail[])).toEqual({
      valid: 'value',
      another: 'data',
    });
  });
});
