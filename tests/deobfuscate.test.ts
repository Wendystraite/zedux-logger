import { pipe } from 'remeda';
import { describe, expect, test } from 'vitest';

import {
  deobfuscate,
  deobfuscateAndTransform,
} from '../src/deobfuscate/deobfuscate.js';

describe('deobfuscate', () => {
  test('should deobfuscate data-last', () => {
    expect(pipe({ f: 'foo', bar: 'bar' }, deobfuscate('f', 'foo'))).toEqual({
      '[f]oo': 'foo',
      bar: 'bar',
    });
  });

  test('should deobfuscate data-first', () => {
    expect(deobfuscate({ f: 'foo', bar: 'bar' }, 'f', 'foo')).toEqual({
      '[f]oo': 'foo',
      bar: 'bar',
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
