import { describe } from 'vitest';

import type { ZeduxLoggerBuiltInTemplateKey } from '../src/types/ZeduxLoggerBuiltInTemplateKey';
import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('graph', () => {
  // basic logger without any logic

  benchBasicLogger();

  const defaultTemplates = [
    'no-snapshots',
    'no-deobfuscate',
    'no-graphs',
  ] satisfies ZeduxLoggerBuiltInTemplateKey[];

  // no graph

  benchZeduxLogger('no graph', {
    templates: [...defaultTemplates, 'no-graphs'],
  });

  // all graphs

  benchZeduxLogger('all graphs', {
    templates: [...defaultTemplates, 'all-graphs'],
  });

  benchZeduxLogger('all incremental graphs', {
    templates: [...defaultTemplates, 'all-graphs'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // flat graph

  benchZeduxLogger('only flat graph', {
    templates: [...defaultTemplates, 'flat-graph'],
  });
  benchZeduxLogger('only incremental flat graph', {
    templates: [...defaultTemplates, 'flat-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // top down graph

  benchZeduxLogger('only top down graph', {
    templates: [...defaultTemplates, 'top-down-graph'],
  });
  benchZeduxLogger('only incremental top down graph', {
    templates: [...defaultTemplates, 'top-down-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // bottom up graph

  benchZeduxLogger('only bottom up graph', {
    templates: [...defaultTemplates, 'bottom-up-graph'],
  });
  benchZeduxLogger('only incremental bottom up graph', {
    templates: [...defaultTemplates, 'bottom-up-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  // by namespaces graph

  benchZeduxLogger('only by namespaces graph', {
    templates: [...defaultTemplates, 'by-namespaces-graph'],
  });
  benchZeduxLogger('only incremental by namespaces graph', {
    templates: [...defaultTemplates, 'by-namespaces-graph'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });
});
