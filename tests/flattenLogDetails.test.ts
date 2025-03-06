import { describe, expect, it } from 'vitest';

import type { LogDetail } from '../src/addToLogs/LogArgs';
import { flattenLogDetails } from '../src/log/flattenLogDetails';

describe('flattenLogDetails', () => {
  it('should return empty object when given empty array', () => {
    expect(flattenLogDetails([])).toEqual({});
  });

  it('should flatten a single log detail', () => {
    const logDetails: LogDetail[] = [
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
    const logDetails: LogDetail[] = [
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
    const logDetails: LogDetail[] = [
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
    const logDetails: LogDetail[] = [
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
    const logDetails: LogDetail[] = [
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
    const logDetails: LogDetail[] = [
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
    const logDetails: Array<LogDetail | false | undefined> = [
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
    ] as LogDetail[];

    expect(flattenLogDetails(logDetails as LogDetail[])).toEqual({
      valid: 'value',
      another: 'data',
    });
  });
});
