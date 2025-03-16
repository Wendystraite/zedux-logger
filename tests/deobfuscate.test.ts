import { pipe } from 'remeda';
import { describe, expect, test } from 'vitest';

import {
  deobfuscate,
  deobfuscateAndTransform,
} from '../src/deobfuscate/deobfuscate.js';

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
