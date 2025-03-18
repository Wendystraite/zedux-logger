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
import { configDefaults } from 'vitest/config';

import { addZeduxLogger } from '../src/addZeduxLogger.js';
import { getZeduxLoggerEcosystemStorage } from '../src/storage/getZeduxLoggerEcosystemStorage.js';
import type { ZeduxLoggerOptions } from '../src/types/ZeduxLoggerOptions.js';

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
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
      error: vi.fn(),
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

  describe('execution time', () => {
    it('should log execution time', () => {
      vi.useFakeTimers({
        toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
      });

      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        events: ['runStart', 'runEnd'],
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();

      expect(consoleMock.log).toHaveBeenCalledTimes(2);
      expect(consoleMock.log.mock.calls).toMatchObject([
        [
          ' [⚙️] simple atom evaluating',
          {
            '📢 event(runStart)': {},
          },
        ],
        [
          ' [⚙️] simple atom evaluated in 0.00ms', // Timers are faked
          {
            '📢 event(runEnd)': {},
            '⏱️ Execution-time': '0ms', // Timers are faked
          },
        ],
      ]);
    });

    it('should not log execution time', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        showInSummary: { showExecutionTime: false },
        showInDetails: { showExecutionTime: false },
        events: ['runStart', 'runEnd'],
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();

      expect(consoleMock.log).toHaveBeenCalledTimes(2);
      expect(consoleMock.log.mock.calls).toMatchObject([
        [
          ' [⚙️] simple atom evaluating',
          {
            '📢 event(runStart)': {},
          },
        ],
        [
          ' [⚙️] simple atom evaluated',
          {
            '📢 event(runEnd)': {},
          },
        ],
      ]);
    });

    it('should not leak timers', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        events: ['runStart', 'runEnd'],
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(
        getZeduxLoggerEcosystemStorage(ecosystem)?.runStartTimeMapping,
      ).toEqual(new Map());
    });

    it('should warn if slow', () => {
      vi.useFakeTimers({
        toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
      });

      const onSlowEvaluationMock = vi.fn();
      const onVerySlowEvaluationMock = vi.fn();

      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        events: ['runStart', 'runEnd'],
        executionTimeOptions: {
          slowThresholdMs: 0,
          warnInConsoleIfSlow: true,
          onSlowEvaluation: onSlowEvaluationMock,
          onVerySlowEvaluation: onVerySlowEvaluationMock,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).toHaveBeenCalledTimes(1);
      expect(consoleMock.warn.mock.calls).toMatchObject([
        ["Zedux Logger: Slow evaluation of 'simple atom' detected: 0ms", {}],
      ]);

      expect(consoleMock.error).not.toHaveBeenCalled();

      expect(onSlowEvaluationMock).toHaveBeenCalledTimes(1);
      expect(onVerySlowEvaluationMock).not.toHaveBeenCalled();
    });

    it('should error if very slow', () => {
      vi.useFakeTimers({
        toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
      });

      const onSlowEvaluationMock = vi.fn();
      const onVerySlowEvaluationMock = vi.fn();

      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        events: ['runStart', 'runEnd'],
        executionTimeOptions: {
          slowThresholdMs: 0,
          verySlowThresholdMs: 0,
          warnInConsoleIfSlow: true,
          errorInConsoleIfVerySlow: true,
          onSlowEvaluation: onSlowEvaluationMock,
          onVerySlowEvaluation: onVerySlowEvaluationMock,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).not.toHaveBeenCalled();

      expect(consoleMock.error).toHaveBeenCalledTimes(1);
      expect(consoleMock.error.mock.calls).toMatchObject([
        [
          "Zedux Logger: Very slow evaluation of 'simple atom' detected: 0ms",
          {},
        ],
      ]);

      expect(onSlowEvaluationMock).not.toHaveBeenCalled();
      expect(onVerySlowEvaluationMock).toHaveBeenCalledTimes(1);
    });
  });
});
