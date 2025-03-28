import {
  type Ecosystem,
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
import { generateSnapshot } from '../src/generateSnapshot/generateSnapshot.js';
import { getZeduxLoggerEcosystemStorage } from '../src/storage/getZeduxLoggerEcosystemStorage.js';
import type { CompleteZeduxLoggerLocalOptions } from '../src/types/ZeduxLoggerLocalOptions.js';
import { addLotsOfAtomsInEcosystem } from './addLotsOfAtomsInEcosystem.js';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('addZeduxLogger', () => {
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

  it('should not log when disabled', () => {
    addZeduxLogger(ecosystem, {
      options: {
        console: consoleMock,
        enabled: false,
      },
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
      options: {
        console: consoleMock,
      },
    });

    cleanup();

    ecosystem.getNode(atom('simple atom', 0));

    expect(consoleMock.log).not.toHaveBeenCalled();
    expect(getZeduxLoggerEcosystemStorage(ecosystem)).toBeUndefined();
  });

  describe('colors', () => {
    it('should log with colors', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: true,
          oneLineLogs: true,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '%c[⚡] %csimple atom%c%c%c%c %cinitialized %cto %c0',
          'color: #6b7280',
          'color: inherit',
          'color: #6b7280',
          'color: #6b7280',
          'color: #6b7280',
          'color: #6b7280',
          'color: #3b82f6',
          'color: #6b7280',
          'color: inherit',
          expect.any(Object),
        ],
      ]);
    });

    it('should log groups with colors', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: true,
          oneLineLogs: false,
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['📢 event(cycle)', expect.any(Object)],
        ['➡️ %cnew state', 'color: #22c55e', 0],
        ['🔗 node', expect.any(Object)],
        ['🔗 sources', expect.any(Map)],
        ['🔗 observers', expect.any(Map)],
        ['🌍 ecosystem', expect.any(Object)],
        ['by-namespaces', expect.any(Object)],
        ['flat', expect.any(Object)],
        ['top-down', expect.any(Object)],
        ['bottom-up', expect.any(Object)],
        ['📸 %csnapshot', 'color: #22c55e', expect.any(Object)],
      ]);
      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.error).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed.mock.calls).toEqual([
        [
          '%c[⚡] %csimple atom%c%c%c%c %cinitialized %cto %c0',
          'color: #6b7280',
          'color: inherit',
          'color: #6b7280',
          'color: #6b7280',
          'color: #6b7280',
          'color: #6b7280',
          'color: #3b82f6',
          'color: #6b7280',
          'color: inherit',
        ],
        ['📈 graph'],
      ]);
      expect(consoleMock.groupEnd.mock.calls).toEqual([[], []]);
    });

    it('should log without colors', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
        },
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
        },
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
            '📸 snapshot': expect.any(Object),
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: false,
        },
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
        ['📸 snapshot', expect.any(Object)],
      ]);
      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.error).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed.mock.calls).toEqual([
        ['[⚡] simple atom initialized to 0'],
        ['📈 graph'],
      ]);
      expect(consoleMock.groupEnd.mock.calls).toEqual([[], []]);
    });

    it('should not log if no summary nor details', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-summary', 'no-details'],
        options: {
          console: consoleMock,
          eventsToShow: ['cycle'],
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log).not.toHaveBeenCalled();
      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.error).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();
    });

    it('should not log group if no details', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: false, // groups
          eventsToShow: ['cycle'],
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] simple atom initialized to 0'],
      ]);
      expect(consoleMock.warn).not.toHaveBeenCalled();
      expect(consoleMock.error).not.toHaveBeenCalled();
      expect(consoleMock.group).not.toHaveBeenCalled();
      expect(consoleMock.groupCollapsed).not.toHaveBeenCalled();
      expect(consoleMock.groupEnd).not.toHaveBeenCalled();
    });
  });

  describe('state', () => {
    it('should log old and new states when enabled', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
        },
        filters: [
          {
            include: ['test atom enabled'],
            options: {
              showInSummary: {
                showOldState: true,
                showNewState: true,
              },
              showInDetails: {
                showStateDiff: true,
                showOldState: true,
                showNewState: true,
              },
            },
          },
          {
            include: ['test atom disabled'],
          },
        ],
      });

      ecosystem.getNode(atom('test atom enabled', 0)).set(1);
      ecosystem.getNode(atom('test atom disabled', 0)).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] test atom enabled initialized to 0',
          {
            '➡️ new-state': 0,
          },
        ],
        [
          '[✏️] test atom enabled changed from 0 to 1',
          {
            '⬅️ old-state': 0,
            '➡️ new-state': 1,
          },
        ],

        ['[⚡] test atom disabled initialized to 0'],
        ['[✏️] test atom disabled changed from 0 to 1'],
      ]);
    });

    it('should limit number of characters of stringified state', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInSummary: { showOldState: true, showNewState: true },
          showInDetails: { showOldState: true, showNewState: true },
        },
        filters: [
          {
            include: ['simple atom 50 chars'],
          },
          {
            include: ['simple atom 5 chars'],
            options: {
              stateOptions: {
                summaryStringifyMaxChars: 5,
              },
            },
          },
          {
            include: ['simple atom 0 chars'],
            options: {
              stateOptions: {
                summaryStringifyMaxChars: 0,
              },
            },
          },
        ],
      });

      ecosystem
        .getNode(atom('simple atom 50 chars', { a: 1, b: 2 }))
        .set({ a: 3, b: 4 });
      ecosystem
        .getNode(atom('simple atom 5 chars', { a: 1, b: 2 }))
        .set({ a: 3, b: 4 });
      ecosystem
        .getNode(
          atom('simple atom 0 chars', {
            foo: 'a very long string that is more than 50 characters and is not limited',
          }),
        )
        .set({
          foo: 'another very long string that is more than 50 characters and is not limited',
        });

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom 50 chars initialized to {"a":1,"b":2}',
          {
            '➡️ new-state': { a: 1, b: 2 },
          },
        ],
        [
          '[✏️] simple atom 50 chars changed from {"a":1,"b":2} to {"a":3,"b":4}',
          {
            '➡️ new-state': { a: 3, b: 4 },
            '⬅️ old-state': { a: 1, b: 2 },
          },
        ],

        [
          '[⚡] simple atom 5 chars initialized to {"a":…',
          {
            '➡️ new-state': { a: 1, b: 2 },
          },
        ],
        [
          '[✏️] simple atom 5 chars changed from {"a":… to {"a":…',
          {
            '➡️ new-state': { a: 3, b: 4 },
            '⬅️ old-state': { a: 1, b: 2 },
          },
        ],

        [
          '[⚡] simple atom 0 chars initialized to {"foo":"a very long string that is more than 50 characters and is not limited"}',
          {
            '➡️ new-state': {
              foo: 'a very long string that is more than 50 characters and is not limited',
            },
          },
        ],
        [
          '[✏️] simple atom 0 chars changed from {"foo":"a very long string that is more than 50 characters and is not limited"} to {"foo":"another very long string that is more than 50 characters and is not limited"}',
          {
            '➡️ new-state': {
              foo: 'another very long string that is more than 50 characters and is not limited',
            },
            '⬅️ old-state': {
              foo: 'a very long string that is more than 50 characters and is not limited',
            },
          },
        ],
      ]);
    });

    it('should not crash when state is recursive', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInSummary: { showOldState: true, showNewState: true },
          showInDetails: { showOldState: true, showNewState: true },
        },
      });

      const recursiveObject: Record<string, unknown> = {};
      recursiveObject.recursive = recursiveObject;

      ecosystem.getNode(atom('recursive atom', recursiveObject));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] recursive atom initialized to [Circular]',
          {
            '➡️ new-state': recursiveObject,
          },
        ],
      ]);
    });
  });

  describe('diffs', () => {
    it('should not log diffs of primitive values', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInDetails: {
            showStateDiff: true,
          },
        },
      });

      ecosystem.getNode(atom('test atom', 0)).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] test atom initialized to 0'],
        ['[✏️] test atom changed from 0 to 1'],
      ]);
    });

    it('should log diffs of complex objects', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInDetails: {
            showStateDiff: true,
          },
        },
      });

      const node = ecosystem.getNode(
        atom('test atom', { a: 1, b: 2 } as object),
      );
      node.set({ a: 1, b: 3 });
      node.set({ a: 1, b: 3, c: 4 });
      node.set({ a: 1, c: 4 });
      node.set({ b: 5, c: 6 });
      node.set({ b: 5, c: 6 });

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] test atom initialized to {"a":1,"b":2}'],
        [
          '[✏️] test atom changed from {"a":1,"b":2} to {"a":1,"b":3}',
          {
            '🔍 1-diff': [['CHANGE b', { oldValue: 2, value: 3 }]],
          },
        ],
        [
          '[✏️] test atom changed from {"a":1,"b":3} to {"a":1,"b":3,"c":4}',
          {
            '🔍 1-diff': [['CREATE c', { value: 4 }]],
          },
        ],
        [
          '[✏️] test atom changed from {"a":1,"b":3,"c":4} to {"a":1,"c":4}',
          {
            '🔍 1-diff': [['REMOVE b', { oldValue: 3 }]],
          },
        ],
        [
          '[✏️] test atom changed from {"a":1,"c":4} to {"b":5,"c":6}',
          {
            '🔍 3-diffs': [
              ['REMOVE a', { oldValue: 1 }],
              ['CHANGE c', { oldValue: 4, value: 6 }],
              ['CREATE b', { value: 5 }],
            ],
          },
        ],
        [
          '[✏️] test atom changed from {"b":5,"c":6} to {"b":5,"c":6}',
          {
            '🔍 (no-diffs)': [],
          },
        ],
      ]);
    });

    it('should log diffs in groups', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: false,
          showInDetails: {
            showStateDiff: true,
          },
        },
      });

      const node = ecosystem.getNode(
        atom('test atom', { a: 1, b: 2 } as object),
      );
      node.set({ a: 1, b: 3 });
      node.set({ a: 1, b: 3 });

      expect(consoleMock.log.mock.calls).toEqual([
        // 1
        ['[⚡] test atom initialized to {"a":1,"b":2}'],

        // 2.3
        ['CHANGE b', { oldValue: 2, value: 3 }],

        // 3.2
        ['🔍 (no diffs)'],
      ]);
      expect(consoleMock.groupCollapsed.mock.calls).toEqual([
        // 2.1
        ['[✏️] test atom changed from {"a":1,"b":2} to {"a":1,"b":3}'],

        // 2.2
        ['🔍 1 diff'],

        // 3.1
        ['[✏️] test atom changed from {"a":1,"b":3} to {"a":1,"b":3}'],
      ]);
    });

    it('should not diff circular objects', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInDetails: {
            showStateDiff: true,
          },
        },
      });

      const circularObject: Record<string, unknown> = {};
      circularObject.circular = circularObject;
      const otherCircularObject: Record<string, unknown> = {};
      otherCircularObject.circular = otherCircularObject;

      const node = ecosystem.getNode(atom('test atom', circularObject));
      node.set({ a: 1, b: 2 });
      node.set({ a: 1, b: 2 });
      node.set(circularObject);
      node.set(otherCircularObject);

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] test atom initialized to [Circular]'],
        [
          '[✏️] test atom changed from [Circular] to {"a":1,"b":2}',
          {
            '🔍 (unknown-diffs)': '[Circular]',
          },
        ],
        [
          '[✏️] test atom changed from {"a":1,"b":2} to {"a":1,"b":2}',
          {
            '🔍 (no-diffs)': [],
          },
        ],
        [
          '[✏️] test atom changed from {"a":1,"b":2} to [Circular]',
          {
            '🔍 (unknown-diffs)': '[Circular]',
          },
        ],
        [
          '[✏️] test atom changed from [Circular] to [Circular]',
          {
            '🔍 (unknown-diffs)': '[Circular]',
          },
        ],
      ]);
    });
  });

  describe('details', () => {
    it('should show details', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
        },
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
            '📸 snapshot': expect.any(Object),
            '🔗 node': expect.any(Object),
            '🔗 observers': expect.any(Object),
            '🔗 sources': expect.any(Object),
          },
        ],
      ]);
    });
  });

  describe('events logging', () => {
    it('should log change events filtered by object', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: {
            change: true,
            cycle: false,
            edge: false,
            error: false,
            invalidate: false,
            promiseChange: false,
            resetStart: false,
            resetEnd: false,
            runStart: false,
            runEnd: false,
          },
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

    it('should log change events filtered by array', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['cycle'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['edge'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['error'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['invalidate'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['promiseChange'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['resetStart', 'resetEnd'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['runStart', 'runEnd'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['runStart', 'runEnd'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInSummary: { showExecutionTime: false },
          showInDetails: { showExecutionTime: false },
          eventsToShow: ['runStart', 'runEnd'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['runStart', 'runEnd'],
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['runStart', 'runEnd'],
          executionTimeOptions: {
            slowThresholdMs: 0,
            warnInConsoleIfSlow: true,
            onSlowEvaluation: onSlowEvaluationMock,
            onVerySlowEvaluation: onVerySlowEvaluationMock,
          },
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
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['runStart', 'runEnd'],
          executionTimeOptions: {
            slowThresholdMs: 0,
            verySlowThresholdMs: 0,
            warnInConsoleIfSlow: true,
            errorInConsoleIfVerySlow: true,
            onSlowEvaluation: onSlowEvaluationMock,
            onVerySlowEvaluation: onVerySlowEvaluationMock,
          },
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

  describe('filters', () => {
    it('should log only included nodes', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: ['includedAtom'],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const includedAtom = atom('includedAtom', 0);
      const excludedAtom = atom('excludedAtom', 0);

      ecosystem.getNode(includedAtom).set(1);
      ecosystem.getNode(excludedAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] includedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should filter node id that weakly match', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: ['included', { idMatch: 'other' }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const includedAtom = atom('includedAtom', 0);
      const excludedAtom = atom('excludedAtom', 0);
      const otherAtom = atom('otherAtom', 0);

      ecosystem.getNode(includedAtom).set(1);
      ecosystem.getNode(excludedAtom).set(1);
      ecosystem.getNode(otherAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] includedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
        [
          '[✏️] otherAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should filter node id that strictly match', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ idEqual: ['foo', 'bar'] }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const fooAtom = atom('foo', 0);
      const barAtom = atom('bar', 0);
      const excludedFooAtom = atom('foobar', 0);
      const excludedBarAtom = atom('otherAtom', 0);

      ecosystem.getNode(fooAtom).set(1);
      ecosystem.getNode(barAtom).set(1);
      ecosystem.getNode(excludedFooAtom).set(1);
      ecosystem.getNode(excludedBarAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] foo changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
        [
          '[✏️] bar changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should exclude nodes based on filters', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            exclude: ['excludedAtom'],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const includedAtom = atom('includedAtom', 0);
      const excludedAtom = atom('excludedAtom', 0);

      ecosystem.getNode(includedAtom).set(1);
      ecosystem.getNode(excludedAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] includedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should prioritize exclude over include', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: ['testAtom'],
            exclude: ['testAtom'],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const testAtom = atom('testAtom', 0);
      ecosystem.getNode(testAtom).set(1);

      expect(consoleMock.log).not.toHaveBeenCalled();
    });

    it('should apply custom options for included nodes', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: ['customOptionsAtom'],
            options: {
              showColors: false,
              oneLineLogs: true,
            },
          },
        ],
        options: {
          console: consoleMock,
          eventsToShow: ['change'],
        },
      });

      const customOptionsAtom = atom('customOptionsAtom', 0);
      ecosystem.getNode(customOptionsAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] customOptionsAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should apply custom options if no include given', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            options: {
              showColors: false,
              oneLineLogs: true,
            },
          },
        ],
        options: {
          console: consoleMock,
          eventsToShow: ['change'],
        },
      });

      const customOptionsAtom = atom('customOptionsAtom', 0);
      ecosystem.getNode(customOptionsAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] customOptionsAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log nodes matching a regex include filter', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ idMatch: /^regexIncluded/ }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const regexIncludedAtom = atom('regexIncludedAtom', 0);
      const nonMatchingAtom = atom('nonMatchingAtom', 0);

      ecosystem.getNode(regexIncludedAtom).set(1);
      ecosystem.getNode(nonMatchingAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] regexIncludedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should exclude nodes matching a regex exclude filter', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            exclude: [{ idMatch: /^regexExcluded/ }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const regexExcludedAtom = atom('regexExcludedAtom', 0);
      const includedAtom = atom('includedAtom', 0);

      ecosystem.getNode(regexExcludedAtom).set(1);
      ecosystem.getNode(includedAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] includedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should apply filters based on node type 1', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: ['@atom'],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const atomNode = atom('atomNode', 0);
      const signalNode = atom('signalNode', () => injectSignal(0));

      ecosystem.getNode(atomNode).set(1);
      ecosystem.getNode(signalNode).S?.set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] atomNode changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
        [
          '[✏️] signalNode changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should apply filters based on node type 2', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ type: '@atom' }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const atomNode = atom('atomNode', 0);
      const signalNode = atom('signalNode', () => injectSignal(0));

      ecosystem.getNode(atomNode).set(1);
      ecosystem.getNode(signalNode).S?.set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] atomNode changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
        [
          '[✏️] signalNode changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should apply filters based on multiple node types', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ type: ['@atom'] }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const atomNode = atom('atomNode', 0);
      const signalNode = atom('signalNode', () => injectSignal(0));

      ecosystem.getNode(atomNode).set(1);
      ecosystem.getNode(signalNode).S?.set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] atomNode changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
        [
          '[✏️] signalNode changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should handle multiple filters with different include and exclude rules', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: ['includedAtom'], // includedAtom
          },
          {
            exclude: ['excludedAtom'], // otherAtom
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const includedAtom = atom('includedAtom', 0);
      const excludedAtom = atom('excludedAtom', 0);
      const otherAtom = atom('otherAtom', 0);

      ecosystem.getNode(includedAtom).set(1);
      ecosystem.getNode(excludedAtom).set(1);
      ecosystem.getNode(otherAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] includedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
        [
          '[✏️] otherAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log nodes matching a tag filter', () => {
      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ tag: 'important' }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      const taggedAtom = atom('taggedAtom', 0, { tags: ['important'] });
      const untaggedAtom = atom('untaggedAtom', 0);

      ecosystem.getNode(taggedAtom).set(1);
      ecosystem.getNode(untaggedAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] taggedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log nodes matching a template filter', () => {
      const includedAtom = atom('includedAtom', 0);
      const excludedAtom = atom('excludedAtom', 0);

      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ template: includedAtom }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['change'],
        },
      });

      ecosystem.getNode(includedAtom).set(1);
      ecosystem.getNode(excludedAtom).set(1);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[✏️] includedAtom changed from 0 to 1',
          expect.objectContaining({
            '📢 event(change)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should log nodes matching a selector filter', () => {
      const someAtom = atom('someAtom', 0);
      const includedSelector = ({ get }: Ecosystem) => get(someAtom);
      const excludedSelector = ({ get }: Ecosystem) => get(someAtom);

      addZeduxLogger(ecosystem, {
        filters: [
          {
            include: [{ template: includedSelector }],
          },
        ],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          eventsToShow: ['cycle'],
        },
      });

      ecosystem.getNode(includedSelector);
      ecosystem.getNode(excludedSelector);

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] @selector(includedSelector)-1 initialized to 0',
          expect.objectContaining({
            '📢 event(cycle)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should not generate flat graph when the global option is disabled', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          graphOptions: {
            showFlatGraph: false,
          },
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          expect.not.objectContaining({
            '📈 graph.flat': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should generate flat graph when the global option is enabled', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          graphOptions: {
            showFlatGraph: true,
          },
        },
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          expect.objectContaining({
            '📈 graph.flat': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should generate flat graph when a filter option is enabled', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          graphOptions: {
            showFlatGraph: false,
          },
        },
        filters: [
          {
            options: {
              graphOptions: {
                showFlatGraph: true,
              },
            },
          },
        ],
      });

      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          expect.objectContaining({
            '📈 graph.flat': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should generate snapshot when a filter option is enabled', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInDetails: {
            showSnapshot: false,
          },
        },
        filters: [
          {
            include: ['simple atom'],
            options: {
              showInDetails: {
                showSnapshot: true,
              },
            },
          },
        ],
      });

      ecosystem.getNode(atom('another atom not logged', 'foo'));
      ecosystem.getNode(atom('simple atom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] simple atom initialized to 0',
          expect.objectContaining({
            '📸 snapshot': {
              'simple atom': 0,
              'another atom not logged': 'foo',
            },
          }),
        ],
      ]);
    });
  });

  describe('templates', () => {
    it('should prioritize options over templates', () => {
      addZeduxLogger(ecosystem, {
        templates: ['show-colors'],
        options: {
          console: consoleMock,
          oneLineLogs: true,
          showColors: false, // This should take precedence
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] testAtom initialized to 0', expect.any(Object)],
      ]);
    });

    it('should prioritize rightmost templates', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          oneLineLogs: true,
        },
        templates: ['custom-template-1', 'custom-template-2'],
        customTemplates: {
          'custom-template-1': {
            showColors: true,
          },
          'custom-template-2': {
            showColors: false,
          },
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] testAtom initialized to 0', expect.any(Object)],
      ]);
    });

    it('should prioritize filters templates', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          oneLineLogs: true,
        },
        customTemplates: {
          'custom-template-1': {
            showColors: true,
          },
          'custom-template-2': {
            showColors: false,
          },
        },
        templates: ['custom-template-1'],
        filters: [
          {
            templates: ['custom-template-2'],
          },
        ],
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] testAtom initialized to 0', expect.any(Object)],
      ]);
    });

    it('should prioritize filters options over templates', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          oneLineLogs: true,
        },
        customTemplates: {
          'custom-template': {
            showColors: true,
          },
        },
        filters: [
          {
            templates: ['custom-template'],
            options: {
              showColors: false,
            },
          },
        ],
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] testAtom initialized to 0', expect.any(Object)],
      ]);
    });

    it('should ignore non-existing templates', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          oneLineLogs: true,
          showColors: false,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        templates: ['default', 'non-existing' as any],
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        ['[⚡] testAtom initialized to 0', expect.any(Object)],
      ]);
    });
  });

  describe('snapshots', () => {
    it('should log snapshots', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInDetails: {
            showSnapshot: true,
          },
        },
      });

      ecosystem.getNode(atom('test nb', 0)).set(1);
      ecosystem.getNode(atom('test str', 'foo'));
      ecosystem.getNode(atom('test bool', () => injectSignal(true)));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] test nb initialized to 0',
          {
            '📸 snapshot': { 'test nb': 0 },
          },
        ],
        [
          '[✏️] test nb changed from 0 to 1',
          {
            '📸 snapshot': { 'test nb': 1 },
          },
        ],
        [
          '[⚡] test str initialized to "foo"',
          {
            '📸 snapshot': { 'test nb': 1, 'test str': 'foo' },
          },
        ],
        [
          '[⚡] @signal(test bool)-1 initialized to true',
          {
            '📸 snapshot': {
              'test nb': 1,
              'test str': 'foo',
              '@signal(test bool)-1': true,
            },
          },
        ],
        [
          '[⚡] test bool initialized to true',
          {
            '📸 snapshot': {
              'test nb': 1,
              'test str': 'foo',
              '@signal(test bool)-1': true,
              'test bool': true,
            },
          },
        ],
      ]);
    });

    it('should incrementally update snapshots', () => {
      addZeduxLogger(ecosystem, {
        templates: ['no-details'],
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          showInDetails: {
            showSnapshot: true,
          },
        },
      });

      addLotsOfAtomsInEcosystem(ecosystem, { triggerSomeChanges: true });

      const expectedSnapshot = {
        '1': 33,
        '@component(MyComponent)-:r0:': undefined,
        '@component(MyComponent)-:r1:': undefined,
        '@component(MyComponent)-:r2:': undefined,
        '@component(MyComponent)-:r3:': undefined,
        '@component(MyComponent)-:r4:': undefined,
        '@component(MyComponent)-:r5:': undefined,
        '@component(MyComponent)-:r6:': undefined,
        '@component(MyComponent)-:r7:': undefined,
        '@listener(@signal(with/signal)-25)-26': undefined,
        '@selector(namedFnSelector)-27': 0,
        '@selector(otherNamedFnSelector)-29': undefined,
        '@selector(unknown)-28': 0,
        '@signal()-13': 11,
        '@signal()-14': 22,
        '@signal(with/signal)-25': 2,
        '@signal(with/signal/2)-30': 0,
        '@signal(withEverything)-1': 'a',
        '@signal(withEverything/withParams-[11])-4': 'a',
        '@signal(withEverything/withParams-[21])-16': 'a',
        '@signal(withEverything/withParamsAndScope-[22])-10': 'a',
        '@signal(withEverything/withParamsAndScope-[42])-22': 'a',
        '@signal(withEverything/withScope)-19': 'a',
        '@signal(withEverything/withScope)-7': 'a',
        'atomNumber/0': 0,
        'atomNumber/1': 1,
        'atomNumber/2': 2,
        'atomNumber/3': 3,
        'atomNumber/4': 4,
        'atomNumber/5': 5,
        'atomNumber/6': 6,
        'atomNumber/7': 7,
        'atomNumber/8': 8,
        'atomNumber/9': 9,
        'nested/one': 0,
        'nested/three': 0,
        'nested/three/four': 0,
        'nested/two': 0,
        'simple atom': 9,
        'simple/atom/with/params-[21]': 21,
        'simple/atom/with/params/and/scope-[42]-@scope("some context value")':
          'some context value42',
        'simple/atom/with/scope-@scope("some context value")':
          'some context value',
        something: 0,
        'with/signal': 2,
        'with/signal/2': 0,
        withEverything: 'a',
        'withEverything/withParams-[11]': 'a',
        'withEverything/withParams-[21]': 'a',
        'withEverything/withParamsAndScope-[22]': 'a',
        'withEverything/withParamsAndScope-[42]': 'a',
        'withEverything/withScope-@scope("simple-context-value")': 'a',
        'withEverything/withScope-@scope("some context value")': 'a',
        'withScope-@scope(1)': 1,
      };

      const generatedSnapshot = generateSnapshot({ ecosystem });

      expect(expectedSnapshot).toEqual(generatedSnapshot);

      expect(
        consoleMock.log.mock.calls[consoleMock.log.mock.calls.length - 1],
      ).toEqual([expect.any(String), { '📸 snapshot': expectedSnapshot }]);
    });
  });

  describe('logHandler', () => {
    it('should call the custom logHandler', () => {
      const logHandlerMock = vi.fn();

      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          logHandler: logHandlerMock,
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(logHandlerMock).toHaveBeenCalledTimes(1);
      expect(logHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          logSummary: expect.any(String),
          details: expect.any(Array),
        }),
        expect.any(Object),
      );
    });

    it('should allow custom logs in logHandler', () => {
      addZeduxLogger(ecosystem, {
        options: {
          showColors: true,
          oneLineLogs: true,
          console: consoleMock,
          logHandler(logArgs) {
            logArgs.addLogToSummary(
              `%cCustom summary log of ${logArgs.what.nodeId!}`,
              '#FF0000',
            );
            logArgs.addLogToDetails({
              emoji: '🚀',
              log: 'Custom detail log',
              data: { key: 'value' },
            });
          },
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '%cCustom summary log of testAtom',
          'color: #FF0000',
          {
            '🚀 Custom-detail-log': { key: 'value' },
          },
        ],
      ]);
    });

    it('should use built-in loggers in logHandler', () => {
      addZeduxLogger(ecosystem, {
        options: {
          showColors: false,
          oneLineLogs: true,
          console: consoleMock,
          logHandler(logArgs, { addAllBuiltInLoggers }) {
            addAllBuiltInLoggers(logArgs);
          },
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          '[⚡] testAtom initialized to 0',
          expect.objectContaining({
            '📢 event(cycle)': expect.any(Object),
          }),
        ],
      ]);
    });

    it('should not log if logHandler is empty', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          logHandler() {
            // noop
          },
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log).not.toHaveBeenCalled();
    });

    it('should log built in summary and details with custom order', () => {
      addZeduxLogger(ecosystem, {
        options: {
          console: consoleMock,
          showColors: false,
          oneLineLogs: true,
          logHandler(
            logArgs,
            {
              addToSummaryEmoji,
              addToSummaryAtomName,
              addToSummarySummary,
              addToDetailsEvent,
              addToDetailsEcosystem,
            },
          ) {
            addToSummaryAtomName(logArgs);
            addToSummarySummary(logArgs);
            addToSummaryEmoji(logArgs);
            addToDetailsEcosystem(logArgs);
            addToDetailsEvent(logArgs);
          },
        },
      });

      ecosystem.getNode(atom('testAtom', 0));

      expect(consoleMock.log.mock.calls).toEqual([
        [
          'testAtom initialized [⚡]',
          {
            '🌍 ecosystem': expect.any(Object),
            '📢 event(cycle)': expect.any(Object),
          },
        ],
      ]);
    });
  });
});
