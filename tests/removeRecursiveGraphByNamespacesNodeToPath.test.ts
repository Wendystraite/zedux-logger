import { describe, expect, it } from 'vitest';

import {
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespaces,
} from '../src/generateGraph/generateGraphByNamespaces';
import { removeRecursiveGraphByNamespacesNodeToPath } from '../src/updateGraphIncrementally/utils/removeRecursiveGraphByNamespacesNodeToPath';

describe('removeRecursiveGraphByNamespacesNodeToPath', () => {
  it('should remove a node at the root level', () => {
    const graph: GraphByNamespaces = {
      foo: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
      bar: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'bar' },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['foo']);

    expect(graph).toEqual({
      bar: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'bar' },
    });
  });

  it('should remove a nested node', () => {
    const graph: GraphByNamespaces = {
      parent: {
        otherChild: 'otherChild',
        child: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'child' },
      },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['parent', 'child']);

    expect(graph).toEqual({ parent: { otherChild: 'otherChild' } });
  });

  it('should do nothing if path does not exist', () => {
    const graph: GraphByNamespaces = {
      foo: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['bar']);

    expect(graph).toEqual({
      foo: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
    });
  });

  it('should do nothing if path is partial', () => {
    const graph: GraphByNamespaces = {
      parent: {
        child: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'child' },
      },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, [
      'parent',
      'nonexistent',
      'child',
    ]);

    expect(graph).toEqual({
      parent: {
        child: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'child' },
      },
    });
  });

  it('should handle empty path array', () => {
    const graph: GraphByNamespaces = {
      foo: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, []);

    expect(graph).toEqual({
      foo: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
    });
  });

  it('should stop traversal when encountering GraphByNamespacesNode objects', () => {
    const graph: GraphByNamespaces = {
      parent: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'parent' },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['parent', 'child']);

    expect(graph).toEqual({
      parent: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'parent' },
    });
  });

  it('should stop traversal when encountering string values', () => {
    const graph: GraphByNamespaces = {
      parent: {
        child: 'string-value',
        sibling: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'sibling' },
      },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, [
      'parent',
      'child',
      'grandchild',
    ]);

    expect(graph).toEqual({
      parent: {
        child: 'string-value',
        sibling: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'sibling' },
      },
    });
  });

  it('should transform sibling GraphByNamespacesNode if alone', () => {
    const graph: GraphByNamespaces = {
      foo: {
        _: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
        sibling: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'sibling' },
      },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['foo', 'sibling']);

    expect(graph).toEqual({
      foo: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
    });
  });

  it('should not transform sibling GraphByNamespacesNode if not alone', () => {
    const graph: GraphByNamespaces = {
      foo: {
        _: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
        sibling: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'sibling' },
        otherSibling: {
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'otherSibling',
        },
      },
    };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['foo', 'sibling']);

    expect(graph).toEqual({
      foo: {
        _: { type: GRAPH_BY_NAMESPACES_NODE_TYPE, id: 'foo' },
        otherSibling: {
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'otherSibling',
        },
      },
    });
  });

  it('should remove parent node if last child is removed', () => {
    const graph: GraphByNamespaces = { '@atom': { one: '@atom/one' } };

    removeRecursiveGraphByNamespacesNodeToPath(graph, ['@atom', 'one']);

    expect(graph).toEqual({});
  });
});
