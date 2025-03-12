import { describe, expect, it } from 'vitest';

import { defaults } from '../src/utils/defaults.js';

describe('defaults', () => {
  it('should return default values when values are undefined', () => {
    const defaultValues = { a: 1, b: 2 };
    const values: { a?: number; b?: number } = { a: undefined, b: undefined };

    const result = defaults(defaultValues, values);

    expect(result).toEqual(defaultValues);
  });

  it('should override default values with provided values', () => {
    const defaultValues = { a: 1, b: 2 };
    const values: { a?: number; b?: number } = { a: 3, b: undefined };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({ a: 3, b: 2 });
  });

  it('should handle nested objects', () => {
    const defaultValues = { a: 1, b: { c: 2, d: 3 } };
    const values: { a?: number; b?: { c?: number } } = { a: 4, b: { c: 5 } };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({ a: 4, b: { c: 5, d: 3 } });
  });

  it('should handle deeply nested objects', () => {
    const defaultValues = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4,
        },
      },
    };
    const values = {
      a: 5,
      b: {
        c: 6,
        d: {
          e: 7,
        },
      },
    };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({
      a: 5,
      b: {
        c: 6,
        d: {
          e: 7,
          f: 4,
        },
      },
    });
  });

  it('should handle empty objects', () => {
    const defaultValues = { a: 1, b: 2 };
    const values = {};

    const result = defaults(defaultValues, values);

    expect(result).toEqual(defaultValues);
  });

  it('should handle arrays', () => {
    const defaultValues = { a: [1, 2, 3], b: 2 };
    const values = { a: [4, 5], b: 6 };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({ a: [4, 5], b: 6 });
  });

  it('should not override value when given value is undefined', () => {
    const defaultValues = {
      a: 1,
      b: 2,
      c: 3,
    };
    const values: { a?: number; b?: number; c?: number | null } = {
      a: undefined,
      b: 4,
      c: null,
    };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({ a: 1, b: 4, c: null });
  });

  it('should handle mixing of different value types', () => {
    const defaultValues = {
      a: 'default',
      b: 10,
      c: true,
      d: { nested: 'value' },
    };
    const values: {
      a?: string;
      b?: number;
      c?: boolean;
      d?: { nested?: string };
    } = {
      a: 'custom',
      b: undefined,
      c: false,
      d: { nested: undefined },
    };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({
      a: 'custom',
      b: 10,
      c: false,
      d: { nested: 'value' },
    });
  });

  it('should preserve null values from input', () => {
    const defaultValues = { a: 1, b: { c: 2 } };
    const values: {
      a?: number | null;
      b?: { c?: number | null } | null;
    } = { a: null, b: null };

    const result = defaults(defaultValues, values);

    expect(result).toEqual({ a: null, b: null });
  });
});
