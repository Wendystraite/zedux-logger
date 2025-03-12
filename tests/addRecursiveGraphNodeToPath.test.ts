import { describe, expect, it } from 'vitest';

import { addRecursiveGraphNodeToPath } from '../src/updateGraphIncrementally/utils/addRecursiveGraphNodeToPath';

describe('addRecursiveGraphNodeToPath', () => {
  it('should create a path in an empty graph', () => {
    const graph = {};
    const path = ['a', 'b', 'c'];

    const result = addRecursiveGraphNodeToPath(graph, path);

    expect(graph).toEqual({ a: { b: { c: {} } } });
    expect(result).toEqual({});
  });

  it('should not override existing nodes', () => {
    const graph = { a: { b: { existing: {} } } };
    const path = ['a', 'b', 'c'];

    const result = addRecursiveGraphNodeToPath(graph, path);

    expect(graph).toEqual({ a: { b: { existing: {}, c: {} } } });
    expect(result).toEqual({});
  });

  it('should handle empty path', () => {
    const graph = {};
    const path: string[] = [];

    const result = addRecursiveGraphNodeToPath(graph, path);

    expect(graph).toEqual({});
    expect(result).toBe(graph);
  });

  it('should add to existing nested structure', () => {
    const graph = { x: { y: {} } };
    const path = ['x', 'y', 'z'];

    const result = addRecursiveGraphNodeToPath(graph, path);

    expect(graph).toEqual({ x: { y: { z: {} } } });
    expect(result).toEqual({});
  });

  it('should return the created or found node', () => {
    const graph = { a: { b: {} } };
    const path = ['a', 'b'];

    const result = addRecursiveGraphNodeToPath(graph, path);

    expect(result).toBe(graph.a.b);
  });
});
