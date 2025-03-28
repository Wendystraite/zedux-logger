import { describe, expect, it } from 'vitest';

import {
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespaces,
  type GraphByNamespacesNodeObject,
} from '../src/generateGraph/generateGraphByNamespaces.js';
import { getRecursiveGraphByNamespacesNodeToPath } from '../src/updateGraphIncrementally/utils/getRecursiveGraphByNamespacesNodeToPath.js';

describe('getRecursiveGraphByNamespacesNodeToPath', () => {
  it('should return undefined for empty graph', () => {
    const graph: GraphByNamespaces = {};
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a']);
    expect(result).toBeUndefined();
  });

  it('should return string node at exact path', () => {
    const graph: GraphByNamespaces = {
      a: 'test-value',
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a']);
    expect(result).toBe('test-value');
  });

  it('should return object node at exact path', () => {
    const node: GraphByNamespacesNodeObject = {
      type: GRAPH_BY_NAMESPACES_NODE_TYPE,
      id: 'path/to/file',
    };
    const graph: GraphByNamespaces = {
      a: node,
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a']);
    expect(result).toBe(node);
  });

  it('should return node at nested path', () => {
    const graph: GraphByNamespaces = {
      a: {
        b: {
          c: 'test-value',
        },
      },
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, [
      'a',
      'b',
      'c',
    ]);
    expect(result).toBe('test-value');
  });

  it('should return node from _ property', () => {
    const graph: GraphByNamespaces = {
      a: {
        _: 'test-value',
      },
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a']);
    expect(result).toBe('test-value');
  });

  it('should return object node from _ property', () => {
    const node: GraphByNamespacesNodeObject = {
      type: GRAPH_BY_NAMESPACES_NODE_TYPE,
      id: 'path/to/file',
    };
    const graph: GraphByNamespaces = {
      a: {
        _: node,
      },
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a']);
    expect(result).toBe(node);
  });

  it('should return undefined when path does not exist', () => {
    const graph: GraphByNamespaces = {
      a: {
        b: 'test-value',
      },
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a', 'c']);
    expect(result).toBeUndefined();
  });

  it('should return undefined when path is blocked by a leaf node', () => {
    const graph: GraphByNamespaces = {
      a: 'test-value',
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, ['a', 'b']);
    expect(result).toBeUndefined();
  });

  it('should return undefined for invalid path traversal', () => {
    const graph: GraphByNamespaces = {
      a: {
        b: 'test-value',
      },
    };
    const result = getRecursiveGraphByNamespacesNodeToPath(graph, [
      'a',
      'b',
      'c',
    ]);
    expect(result).toBeUndefined();
  });
});
