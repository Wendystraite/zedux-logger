import { describe, expect, it } from 'vitest';

import { deletePath } from '../src/utils/deletePath';

describe('deletePath', () => {
  it('should delete a property at the given path', () => {
    const obj = { a: { b: { c: 1 } } };
    deletePath(obj, ['a', 'b', 'c']);
    expect(obj).toEqual({ a: { b: {} } });
  });

  it('should handle empty path', () => {
    const obj = { a: 1 };
    deletePath(obj, []);
    expect(obj).toEqual({ a: 1 });
  });

  it('should handle non-existent path', () => {
    const obj = { a: { b: 1 } };
    deletePath(obj, ['a', 'c', 'd']);
    expect(obj).toEqual({ a: { b: 1 } });
  });

  it('should handle path with non-object parent', () => {
    const obj = { a: 1 };
    deletePath(obj, ['a', 'b']);
    expect(obj).toEqual({ a: 1 });
  });

  it('should delete a property at the root level', () => {
    const obj = { a: 1, b: 2 };
    deletePath(obj, ['a']);
    expect(obj).toEqual({ b: 2 });
  });

  it('should handle nested objects correctly', () => {
    const obj = { a: { b: { c: { d: 1 } } } };
    deletePath(obj, ['a', 'b', 'c']);
    expect(obj).toEqual({ a: { b: {} } });
  });
});
