import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('graph', () => {
  // basic logger without any logic

  benchBasicLogger();

  // no graph

  const defaultOptions = {
    deobfuscateSingleLetters: false,
    showSnapshot: false,
    showGraph: false,
  };

  benchZeduxLogger('no graph', {
    ...defaultOptions,

    showGraph: false,
  });

  // all graphs

  benchZeduxLogger('all graphs', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: true,
    showTopDownGraph: true,
    showBottomUpGraph: true,
    showByNamespacesGraph: true,

    useIncrementalGraph: false,
  });

  benchZeduxLogger('all incremental graphs', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: true,
    showTopDownGraph: true,
    showBottomUpGraph: true,
    showByNamespacesGraph: true,

    useIncrementalGraph: true,
  });

  // flat graph

  benchZeduxLogger('only flat graph', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: true,
    showTopDownGraph: false,
    showBottomUpGraph: false,
    showByNamespacesGraph: false,

    useIncrementalGraph: false,
  });
  benchZeduxLogger('only incremental flat graph', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: true,
    showTopDownGraph: false,
    showBottomUpGraph: false,
    showByNamespacesGraph: false,

    useIncrementalGraph: true,
  });

  // top down graph

  benchZeduxLogger('only top down graph', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: false,
    showTopDownGraph: true,
    showBottomUpGraph: false,
    showByNamespacesGraph: false,

    useIncrementalGraph: false,
  });
  benchZeduxLogger('only incremental top down graph', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: false,
    showTopDownGraph: true,
    showBottomUpGraph: false,
    showByNamespacesGraph: false,

    useIncrementalGraph: true,
  });

  // bottom up graph

  benchZeduxLogger('only bottom up graph', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: false,
    showTopDownGraph: false,
    showBottomUpGraph: true,
    showByNamespacesGraph: false,

    useIncrementalGraph: false,
  });
  benchZeduxLogger('only incremental bottom up graph', {
    ...defaultOptions,

    showGraph: true,
    showFlatGraph: false,
    showTopDownGraph: false,
    showBottomUpGraph: true,
    showByNamespacesGraph: false,

    useIncrementalGraph: true,
  });

  // by namespaces graph

  benchZeduxLogger('only by namespaces graph', {
    showSnapshot: false,

    showGraph: true,
    showFlatGraph: false,
    showTopDownGraph: false,
    showBottomUpGraph: false,
    showByNamespacesGraph: true,

    useIncrementalGraph: false,
  });
  benchZeduxLogger('only incremental by namespaces graph', {
    showSnapshot: false,

    showGraph: true,
    showFlatGraph: false,
    showTopDownGraph: false,
    showBottomUpGraph: false,
    showByNamespacesGraph: true,

    useIncrementalGraph: true,
  });
});
