import {
  AtomInstance,
  ExternalNode,
  Listener,
  MappedSignal,
  SelectorInstance,
  atom,
  createEcosystem,
} from '@zedux/atoms';
import { Signal } from '@zedux/atoms';
import { pipe } from 'remeda';
import { describe, expect, it, test } from 'vitest';

import {
  deobfuscate,
  deobfuscateAndTransform,
} from '../src/deobfuscate/deobfuscate.js';
import { deobfuscateEcosystem } from '../src/deobfuscate/deobfuscateEcosystem.js';
import {
  type AnyEvent,
  deobfuscateEvent,
} from '../src/deobfuscate/deobfuscateEvent.js';
import { deobfuscateNode } from '../src/deobfuscate/deobfuscateNode.js';

type MappedKeysOf<T> = { [K in keyof Required<T>]: K };

function addMissingKeys<T extends object>(
  obj: T,
  mappedKeys: MappedKeysOf<T>,
): T {
  for (const key in mappedKeys) {
    if (key in obj) {
      continue;
    }
    obj[key as keyof T] = key as T[keyof T];
  }
  return obj;
}

describe('deobfuscate', () => {
  test('should deobfuscate data-last', () => {
    expect(
      pipe({ f: 'foo value', bar: 'bar value' }, deobfuscate('f', 'foo')),
    ).toEqual({
      '[f]oo': 'foo value',
      bar: 'bar value',
    });
  });

  test('should deobfuscate data-first', () => {
    expect(
      deobfuscate({ f: 'foo value', bar: 'bar value' }, 'f', 'foo'),
    ).toEqual({
      '[f]oo': 'foo value',
      bar: 'bar value',
    });
  });

  test('should deobfuscate with undefined value', () => {
    expect(deobfuscate({ f: undefined }, 'f', 'foo')).toEqual({
      '[f]oo': undefined,
    });
  });

  test('should deobfuscate with 1 letter', () => {
    expect(deobfuscate({ w: 'why value' }, 'w', 'why')).toEqual({
      '[w]hy': 'why value',
    });
  });

  test('should deobfuscate with 2 letters', () => {
    expect(deobfuscate({ wt: 'why tail value' }, 'wt', 'why tail')).toEqual({
      '[w]hy [t]ail': 'why tail value',
    });
  });

  test('should fallback to default translation if key is not found in translation', () => {
    expect(
      deobfuscate({ izn: 'isZeduxNode value' }, 'izn', 'isZeduxNode'),
    ).toEqual({
      '[izn] (isZeduxNode)': 'isZeduxNode value',
    });
  });

  test('should handle empty key', () => {
    expect(deobfuscate({ a: 'value' }, '' as 'a', '')).toEqual({
      a: 'value',
    });
  });

  test('should handle empty translation', () => {
    expect(deobfuscate({ a: 'value' }, 'a', '')).toEqual({
      a: 'value',
    });
  });

  test('should handle special characters in keys', () => {
    expect(deobfuscate({ $_: 'special chars' }, '$_', 'special')).toEqual({
      '[$_] (special)': 'special chars',
    });
  });

  test('should handle numeric keys', () => {
    expect(deobfuscate({ '123': 'numeric key' }, '123', 'number123')).toEqual({
      'number[1][2][3]': 'numeric key',
    });
  });

  test('should not change not found keys', () => {
    expect(deobfuscate({ a: 'value' }, 'b' as 'a', 'b')).toEqual({
      a: 'value',
    });
  });
});

describe('deobfuscateAndTransform', () => {
  test('should deobfuscate data-last', () => {
    expect(
      pipe(
        { f: 'foo', bar: 'bar' },
        deobfuscateAndTransform('f', 'foo', (foo) => foo + '+foo'),
      ),
    ).toEqual({ '[f]oo': 'foo+foo', bar: 'bar' });
  });

  test('should deobfuscate data-first', () => {
    expect(
      deobfuscateAndTransform(
        { f: 'foo', bar: 'bar' },
        'f',
        'foo',
        (foo) => foo + '+foo',
      ),
    ).toEqual({
      '[f]oo': 'foo+foo',
      bar: 'bar',
    });
  });
});

describe('deobfuscateNode', () => {
  it.each([
    [
      'ExternalNode',
      () => {
        return addMissingKeys(
          new ExternalNode(createEcosystem(), 'test', () => {}),
          {
            e: 'e',
            id: 'id',
            n: 'n',
            T: 'T',
            i: 'i',
            o: 'o',
            p: 'p',
            s: 's',
            t: 't',
            destroy: 'destroy',
            get: 'get',
            d: 'd',
            h: 'h',
            j: 'j',
            k: 'k',
            m: 'm',
            u: 'u',
            _generics: '_generics',
            izn: 'izn',
            L: 'L',
            R: 'R',
            V: 'V',
            W: 'W',
            getOnce: 'getOnce',
            on: 'on',
            params: 'params',
            status: 'status',
            template: 'template',
            c: 'c',
            f: 'f',
            l: 'l',
            r: 'r',
            v: 'v',
            w: 'w',
            wt: 'wt',
          },
        );
      },
    ],
    [
      'Listener',
      () => {
        return addMissingKeys(new Listener(createEcosystem(), 'test'), {
          C: 'C',
          N: 'N',
          D: 'D',
          I: 'I',
          j: 'j',
          r: 'r',
          e: 'e',
          id: 'id',
          n: 'n',
          T: 'T',
          i: 'i',
          o: 'o',
          p: 'p',
          s: 's',
          t: 't',
          destroy: 'destroy',
          get: 'get',
          d: 'd',
          h: 'h',
          k: 'k',
          m: 'm',
          u: 'u',
          _generics: '_generics',
          izn: 'izn',
          L: 'L',
          R: 'R',
          V: 'V',
          W: 'W',
          getOnce: 'getOnce',
          on: 'on',
          params: 'params',
          status: 'status',
          template: 'template',
          c: 'c',
          f: 'f',
          l: 'l',
          v: 'v',
          w: 'w',
          wt: 'wt',
        });
      },
    ],
    [
      'Signal',
      () => {
        return addMissingKeys(
          new Signal(createEcosystem(), 'test', 0, {}, false),
          {
            e: 'e',
            id: 'id',
            v: 'v',
            E: 'E',
            o: 'o',
            p: 'p',
            s: 's',
            t: 't',
            destroy: 'destroy',
            mutate: 'mutate',
            send: 'send',
            set: 'set',
            d: 'd',
            h: 'h',
            j: 'j',
            m: 'm',
            _generics: '_generics',
            izn: 'izn',
            L: 'L',
            R: 'R',
            T: 'T',
            V: 'V',
            W: 'W',
            get: 'get',
            getOnce: 'getOnce',
            on: 'on',
            params: 'params',
            status: 'status',
            template: 'template',
            c: 'c',
            f: 'f',
            l: 'l',
            r: 'r',
            w: 'w',
            wt: 'wt',
          },
        );
      },
    ],
    [
      'AtomInstance',
      () => {
        return addMissingKeys(
          new AtomInstance(createEcosystem(), atom('test', 0), 'test', [1, 2]),
          {
            t: 't',
            p: 'p',
            api: 'api',
            exports: 'exports',
            promise: 'promise',
            a: 'a',
            H: 'H',
            I: 'I',
            N: 'N',
            S: 'S',
            promiseError: 'promiseError',
            promiseStatus: 'promiseStatus',
            destroy: 'destroy',
            invalidate: 'invalidate',
            mutate: 'mutate',
            send: 'send',
            set: 'set',
            d: 'd',
            h: 'h',
            i: 'i',
            j: 'j',
            m: 'm',
            r: 'r',
            x: 'x',
            e: 'e',
            id: 'id',
            v: 'v',
            E: 'E',
            o: 'o',
            s: 's',
            _generics: '_generics',
            izn: 'izn',
            L: 'L',
            R: 'R',
            T: 'T',
            V: 'V',
            W: 'W',
            get: 'get',
            getOnce: 'getOnce',
            on: 'on',
            params: 'params',
            status: 'status',
            template: 'template',
            c: 'c',
            f: 'f',
            l: 'l',
            w: 'w',
            wt: 'wt',
          },
        );
      },
    ],
    [
      'SelectorInstance',
      () => {
        return addMissingKeys(
          new SelectorInstance(createEcosystem(), 'test', () => 0, [0]),
          {
            e: 'e',
            id: 'id',
            t: 't',
            p: 'p',
            o: 'o',
            s: 's',
            destroy: 'destroy',
            d: 'd',
            h: 'h',
            j: 'j',
            m: 'm',
            _generics: '_generics',
            izn: 'izn',
            L: 'L',
            R: 'R',
            T: 'T',
            V: 'V',
            W: 'W',
            get: 'get',
            getOnce: 'getOnce',
            on: 'on',
            params: 'params',
            status: 'status',
            template: 'template',
            c: 'c',
            f: 'f',
            l: 'l',
            r: 'r',
            v: 'v',
            w: 'w',
            wt: 'wt',
          },
        );
      },
    ],
    [
      'MappedSignal',
      () => {
        const ecosystem = createEcosystem();
        return addMissingKeys(
          new MappedSignal(ecosystem, 'test', {
            foo: new Signal(ecosystem, 'test-2', 0),
          }),
          {
            M: 'M',
            C: 'C',
            b: 'b',
            I: 'I',
            N: 'N',
            mutate: 'mutate',
            send: 'send',
            set: 'set',
            j: 'j',
            r: 'r',
            u: 'u',
            e: 'e',
            id: 'id',
            v: 'v',
            E: 'E',
            o: 'o',
            p: 'p',
            s: 's',
            t: 't',
            destroy: 'destroy',
            d: 'd',
            h: 'h',
            m: 'm',
            _generics: '_generics',
            izn: 'izn',
            L: 'L',
            R: 'R',
            T: 'T',
            V: 'V',
            W: 'W',
            get: 'get',
            getOnce: 'getOnce',
            on: 'on',
            params: 'params',
            status: 'status',
            template: 'template',
            c: 'c',
            f: 'f',
            l: 'l',
            w: 'w',
            wt: 'wt',
          },
        );
      },
    ],
  ])('should deobfuscate all single letters of %s', (_cst, createNode) => {
    const node = createNode();
    const deobfuscated = deobfuscateNode(node);
    const singleLetters = Object.entries(deobfuscated).filter(
      ([key]) => key.length === 1,
    );
    expect(singleLetters).toEqual([]);
    expect(
      (deobfuscated as unknown as Record<'__original', unknown>).__original,
    ).toBe(node);
  });
});

describe('deobfuscateEcosystem', () => {
  it('should deobfuscate all single letters of Ecosystem', () => {
    const node = createEcosystem();
    const deobfuscated = deobfuscateEcosystem(
      addMissingKeys(node, {
        asyncScheduler: 'asyncScheduler',
        complexParams: 'complexParams',
        context: 'context',
        ecosystem: 'ecosystem',
        hydration: 'hydration',
        id: 'id',
        idCounter: 'idCounter',
        onReady: 'onReady',
        overrides: 'overrides',
        ssr: 'ssr',
        syncScheduler: 'syncScheduler',
        tags: 'tags',
        C: 'C',
        L: 'L',
        S: 'S',
        T: 'T',
        b: 'b',
        cf: 'cf',
        ch: 'ch',
        cs: 'cs',
        n: 'n',
        s: 's',
        w: 'w',
        wt: 'wt',
        _storage: '_storage',
        addOverrides: 'addOverrides',
        batch: 'batch',
        dehydrate: 'dehydrate',
        find: 'find',
        findAll: 'findAll',
        get: 'get',
        getInstance: 'getInstance',
        getNode: 'getNode',
        getNodeOnce: 'getNodeOnce',
        getOnce: 'getOnce',
        hash: 'hash',
        hydrate: 'hydrate',
        makeId: 'makeId',
        on: 'on',
        removeOverrides: 'removeOverrides',
        reset: 'reset',
        select: 'select',
        setOverrides: 'setOverrides',
        signal: 'signal',
        viewGraph: 'viewGraph',
        why: 'why',
        withScope: 'withScope',
        j: 'j',
        u: 'u',
      }),
    );
    const singleLetters = Object.entries(deobfuscated).filter(
      ([key]) => key.length === 1,
    );
    expect(singleLetters).toEqual([]);
    expect(
      (deobfuscated as unknown as Record<'__original', unknown>).__original,
    ).toBe(node);
  });
});

describe('deobfuscateEvent', () => {
  it('should deobfuscate all single letters of Event', () => {
    const node = { reasons: [] } as Partial<AnyEvent> as AnyEvent;
    const deobfuscated = deobfuscateEvent(
      addMissingKeys(node, {
        type: 'type',
        action: 'action',
        error: 'error',
        hydration: 'hydration',
        listeners: 'listeners',
        newState: 'newState',
        newStatus: 'newStatus',
        observer: 'observer',
        oldState: 'oldState',
        oldStatus: 'oldStatus',
        operation: 'operation',
        overrides: 'overrides',
        reasons: 'reasons',
        source: 'source',
      }),
    );
    const singleLetters = Object.entries(deobfuscated).filter(
      ([key]) => key.length === 1,
    );
    expect(singleLetters).toEqual([]);
    expect(
      (deobfuscated as unknown as Record<'__original', unknown>).__original,
    ).toBe(node);
  });
});
