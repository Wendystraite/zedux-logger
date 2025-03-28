import { describe, expect, it } from 'vitest';

import type { GraphByNamespaces } from '../src/generateGraph/generateGraphByNamespaces';
import { addRecursiveGraphByNamespacesNodeToPath } from '../src/updateGraphIncrementally/utils/addRecursiveGraphByNamespacesNodeToPath';

describe('addRecursiveGraphByNamespacesNodeToPath', () => {
  it('should add a value to an empty graph', () => {
    const draft: GraphByNamespaces = {};
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a'],
      'value',
    );
    expect(result).toBe('value');
    expect(draft).toEqual({ a: 'value' });
  });

  it('should add a value to a nested path in an empty graph', () => {
    const draft: GraphByNamespaces = {};
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a', 'b', 'c'],
      'value',
    );
    expect(result).toBe('value');
    expect(draft).toEqual({ a: { b: { c: 'value' } } });
  });

  it('should add a value to an existing graph', () => {
    const draft: GraphByNamespaces = { x: 'existing' };
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a'],
      'value',
    );
    expect(result).toBe('value');
    expect(draft).toEqual({ x: 'existing', a: 'value' });
  });

  it('should handle object values', () => {
    const draft: GraphByNamespaces = {};
    const objectValue = { prop: 'test' };
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a'],
      objectValue,
    );
    expect(result).toBe(objectValue);
    expect(draft).toEqual({ a: objectValue });
  });

  it('should handle existing string values at the path', () => {
    const draft: GraphByNamespaces = { a: 'existing' };
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a'],
      'new-value',
    );
    expect(result).toBe('new-value');
    expect(draft).toEqual({ a: 'new-value' });
  });

  it('should handle existing object values along the path', () => {
    const draft: GraphByNamespaces = { a: { b: 'existing' } };
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a', 'c'],
      'value',
    );
    expect(result).toBe('value');
    expect(draft).toEqual({ a: { b: 'existing', c: 'value' } });
  });

  it('should create an _ property when replacing a simple value with a complex path', () => {
    const draft: GraphByNamespaces = { a: 'existing' };
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['a', 'b'],
      'value',
    );
    expect(result).toBe('value');
    expect(draft).toEqual({ a: { _: 'existing', b: 'value' } });
  });

  it('should create an _ property when adding a value to an existing graph node', () => {
    const draft: GraphByNamespaces = {
      '@atom': { one: { '@signal': 'signal-value' } },
    };
    const result = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      ['@atom', 'one'],
      'value',
    );
    expect(result).toBe('value');
    expect(draft).toEqual({
      '@atom': {
        one: { _: 'value', '@signal': 'signal-value' },
      },
    });
  });

  it('should handle multiple calls correctly', () => {
    const draft: GraphByNamespaces = {};
    addRecursiveGraphByNamespacesNodeToPath(draft, ['a', 'b'], 'value1');
    addRecursiveGraphByNamespacesNodeToPath(draft, ['a', 'c'], 'value2');
    expect(draft).toEqual({ a: { b: 'value1', c: 'value2' } });
  });
});
