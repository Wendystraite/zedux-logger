import {
  api,
  atom,
  createEcosystem,
  injectAtomValue,
  injectSignal,
} from '@zedux/react';
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

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('addZeduxLogger', () => {
  let ecosystem: ReturnType<typeof createEcosystem>;
  let consoleMock: Record<
    keyof NonNullable<ZeduxLoggerOptions['console']>,
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

  const ALL_EVENTS_DISABLED = {
    change: false,
    cycle: false,
    edge: false,
    error: false,
    invalidate: false,
    promiseChange: false,
    resetStart: false,
    resetEnd: false,
    runStart: false,
    runEnd: false,
  };

  it('should not log when disabled', () => {
    addZeduxLogger(ecosystem, {
      console: consoleMock,
      enabled: false,
    });

    ecosystem.getNode(atom('simple atom', 0));

    expect(consoleMock.log).not.toHaveBeenCalled();
    expect(consoleMock.warn).not.toHaveBeenCalled();
    expect(consoleMock.error).not.toHaveBeenCalled();
    expect(consoleMock.group).not.toHaveBeenCalled();
    expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
    expect(consoleMock.groupEnd).not.toHaveBeenCalled();
  });

  it('should cleanup listener when cleanup function is called', () => {
    const cleanup = addZeduxLogger(ecosystem, {
      console: consoleMock,
    });

    cleanup();

    ecosystem.getNode(atom('simple atom', 0));

    expect(consoleMock.log).not.toHaveBeenCalled();
    expect(getZeduxLoggerEcosystemStorage(ecosystem)).toBeUndefined();
  });

  describe('colors', () => {
    it('should log with colors', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: true,
        oneLineLogs: true,
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '%c[⚡] %csimple atom%c%c%c%c %cinitialized %cto %c0',
          'color: #6a7282; font-weight: lighter;',
          'color: inherit; font-weight: normal;',
          'color: #6a7282; font-weight: lighter;',
          'color: #6a7282; font-weight: lighter;',
          'color: #6a7282; font-weight: lighter;',
          'color: #6a7282; font-weight: lighter;',
          'color: #2b7fff; font-weight: normal;',
          'color: #6a7282; font-weight: lighter;',
          'color: inherit; font-weight: normal;',
          expect.any(Object),
        ],
      ]);
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
      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] simple atom initialized to 0', expect.any(Object)],
      ]);
    });
  });

  describe('logs', () => {
    it('should log in one line', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          {
            '➡️ new-state': 0,
            '🌍 ecosystem': expect.any(Object),
            '📈 graph.bottom-up': expect.any(Object),
            '📈 graph.by-namespaces': expect.any(Object),
            '📈 graph.flat': expect.any(Object),
            '📈 graph.top-down': expect.any(Object),
            '📢 event(cycle)': expect.any(Object),
            '📸 snapshot.new-snapshot': expect.any(Object),
            '🔗 node': expect.any(Object),
            '🔗 observers': expect.any(Object),
            '🔗 sources': expect.any(Object),
          },
        ],
      ]);
      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.error).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();
    });

    it('should log in groups', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: false,
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['📢 event(cycle)', expect.any(Object)],
        ['➡️ new state', 0],
        ['🔗 node', expect.any(Object)],
        ['🔗 sources', expect.any(Map)],
        ['🔗 observers', expect.any(Map)],
        ['🌍 ecosystem', expect.any(Object)],
        ['by-namespaces', expect.any(Object)],
        ['flat', expect.any(Object)],
        ['top-down', expect.any(Object)],
        ['bottom-up', expect.any(Object)],
        ['new snapshot', expect.any(Object)],
      ]);
      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.error).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed.mock.calls).toEqual([
        ['[⚡] simple atom initialized to 0'],
        ['📈 graph'],
        ['📸 snapshot'],
      ]);
      expect(consoleMock.groupEnd.mock.calls).toEqual([[], [], []]);
    });
  });

  describe('details', () => {
    it('should show details', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log).toHaveBeenCalledTimes(1);
      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          {
            '➡️ new-state': 0,
            '🌍 ecosystem': expect.any(Object),
            '📈 graph.bottom-up': expect.any(Object),
            '📈 graph.by-namespaces': expect.any(Object),
            '📈 graph.flat': expect.any(Object),
            '📈 graph.top-down': expect.any(Object),
            '📢 event(cycle)': expect.any(Object),
            '📸 snapshot.new-snapshot': expect.any(Object),
            '🔗 node': expect.any(Object),
            '🔗 observers': expect.any(Object),
            '🔗 sources': expect.any(Object),
          },
        ],
      ]);
    });
  });

  describe('events logging', () => {
    it('should log change events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          change: true,
        },
      });

      const testAtom = atom('test atom', 0);
      const node = ecosystem.getNode(testAtom);
      node.set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] test atom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log cycle events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          cycle: true,
        },
      });

      ecosystem.getNodeOnce(atom('simple atom', 0));

      ecosystem.reset();

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          expect.objectContaining({
            '📢 event(cycle)': expect.any(Object),
          }),
        ],
        [
          '[💥] simple atom destroyed',
          expect.objectContaining({
            '📢 event(cycle)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log edge events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          edge: true,
        },
      });

      const sourceAtom = atom('sourceAtom', 0);
      const targetAtom = atom('targetAtom', () => injectAtomValue(sourceAtom));

      ecosystem.getNode(targetAtom);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[📈] sourceAtom edge added targetAtom',
          expect.objectContaining({
            '📢 event(edge)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log error events', () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);

      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          error: true,
        },
      });

      const errorAtom = atom('errorAtom', () => {
        throw new Error('Test error');
      });

      try {
        ecosystem.getNode(errorAtom);
      } catch (error: unknown) {
        void error; // Ignore error
      }

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[❌] errorAtom error',
          expect.objectContaining({
            '📢 event(error)': expect.any(Object),
          }),
        ],
      ]);

      // eslint-disable-next-line no-console
      expect(vi.mocked(console.error)).toHaveBeenCalledExactlyOnceWith(
        'Zedux: Error while evaluating atom "errorAtom":',
        new Error('Test error'),
      );
    });

    it('should log invalidate events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          invalidate: true,
        },
      });

      const testAtom = atom('test atom', 0);
      const node = ecosystem.getNode(testAtom);
      node.invalidate();

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[🗑️] test atom invalidate',
          expect.objectContaining({
            '📢 event(invalidate)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log promiseChange events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          promiseChange: true,
        },
      });

      const asyncAtom = atom('async', () => {
        const dataSignal = injectSignal('loading');
        const promise = new Promise((resolve) => setTimeout(resolve, 10)).then(
          () => {
            dataSignal.set('loaded');
          },
        );
        return api(dataSignal).setPromise(promise);
      });
      ecosystem.getNode(asyncAtom);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⌛] async promise loading',
          expect.objectContaining({
            '📢 event(promiseChange)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log resetStart and resetEnd events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          resetStart: true,
          resetEnd: true,
        },
      });

      ecosystem.reset();

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[🧹] resetting ecosystem',
          expect.objectContaining({
            '📢 event(resetStart)': expect.any(Object),
          }),
        ],
        [
          '[🧹] ecosystem reset',
          expect.objectContaining({
            '📢 event(resetEnd)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log runStart and runEnd events', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          runStart: true,
          runEnd: true,
        },
      });

      ecosystem.getNodeOnce(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚙️] simple atom evaluating',
          expect.objectContaining({
            '📢 event(runStart)': expect.any(Object),
          }),
        ],
        [
          expect.stringMatching(/^\[⚙️\] simple atom evaluated in .+ms$/),
          expect.objectContaining({
            '📢 event(runEnd)': expect.any(Object),
          }),
        ],
      ]);
    });
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
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          runStart: true,
          runEnd: true,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();

      expect(consoleMock.log).toHaveBeenCalledTimes(2);
      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚙️] simple atom evaluating',
          expect.objectContaining({
            '📢 event(runStart)': expect.any(Object),
          }),
        ],
        [
          '[⚙️] simple atom evaluated in 0.00ms', // Timers are faked
          expect.objectContaining({
            '📢 event(runEnd)': expect.any(Object),
            '⏱️ Execution-time': '0ms', // Timers are faked
          }),
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
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          runStart: true,
          runEnd: true,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();

      expect(consoleMock.log).toHaveBeenCalledTimes(2);
      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚙️] simple atom evaluating',
          expect.objectContaining({
            '📢 event(runStart)': expect.any(Object),
          }),
        ],
        [
          '[⚙️] simple atom evaluated',
          expect.objectContaining({
            '📢 event(runEnd)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should not leak timers', () => {
      addZeduxLogger(ecosystem, {
        console: consoleMock,
        showColors: false,
        oneLineLogs: true,
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          runStart: true,
          runEnd: true,
        },
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
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          runStart: true,
          runEnd: true,
        },
        executionTimeOptions: {
          slowThresholdMs: 0,
          warnInConsoleIfSlow: true,
          onSlowEvaluation: onSlowEvaluationMock,
          onVerySlowEvaluation: onVerySlowEvaluationMock,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.warn).toHaveBeenCalledTimes(1);
      expect(consoleMock.warn.mock.calls).toEqual([
        [
          "Zedux Logger: Slow evaluation of 'simple atom' detected: 0ms",
          expect.any(Object),
        ],
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
        eventsToShow: {
          ...ALL_EVENTS_DISABLED,
          runStart: true,
          runEnd: true,
        },
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
      expect(consoleMock.error.mock.calls).toEqual([
        [
          "Zedux Logger: Very slow evaluation of 'simple atom' detected: 0ms",
          expect.any(Object),
        ],
      ]);

      expect(onSlowEvaluationMock).not.toHaveBeenCalled();
      expect(onVerySlowEvaluationMock).toHaveBeenCalledTimes(1);
    });
  });
});
