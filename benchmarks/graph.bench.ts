import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('graph', () => {
  // basic logger without any logic

  benchBasicLogger();

  // no graph

  benchZeduxLogger('no graph', {
    templates: ['no-graphs'],
  });

  // all graphs

  benchZeduxLogger('all graphs', {
    templates: ['all-graphs'],
  });

  benchZeduxLogger('all incremental graphs', {
    templates: ['all-graphs'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // flat graph

  benchZeduxLogger('only flat graph', {
    templates: ['flat-graph'],
  });
  benchZeduxLogger('only incremental flat graph', {
    templates: ['flat-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // top down graph

  benchZeduxLogger('only top down graph', {
    templates: ['top-down-graph'],
  });
  benchZeduxLogger('only incremental top down graph', {
    templates: ['top-down-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // bottom up graph

  benchZeduxLogger('only bottom up graph', {
    templates: ['bottom-up-graph'],
  });
  benchZeduxLogger('only incremental bottom up graph', {
    templates: ['bottom-up-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // by namespaces graph

  benchZeduxLogger('only by namespaces graph', {
    templates: ['by-namespaces-graph'],
  });
  benchZeduxLogger('only incremental by namespaces graph', {
    templates: ['by-namespaces-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });
});
