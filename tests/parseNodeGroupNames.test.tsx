import { describe, expect, it } from 'vitest';

import { parseNodeGroupNames } from '../src/parseAtomId/parseNodeGroupNames.js';
import { LOTS_OF_ATOMS_IDS } from './addLotsOfAtomsInEcosystem.js';

const TESTS: Array<[nodeId: string, groupNames: string[]]> = [
  ['atomNumber/0', ['atomNumber', '0']],
  ['atomNumber/1', ['atomNumber', '1']],
  ['atomNumber/2', ['atomNumber', '2']],
  ['atomNumber/3', ['atomNumber', '3']],
  ['atomNumber/4', ['atomNumber', '4']],
  ['atomNumber/5', ['atomNumber', '5']],
  ['atomNumber/6', ['atomNumber', '6']],
  ['atomNumber/7', ['atomNumber', '7']],
  ['atomNumber/8', ['atomNumber', '8']],
  ['atomNumber/9', ['atomNumber', '9']],
  ['simple atom', ['simple atom']],
  ['nested/one', ['nested', 'one']],
  ['nested/two', ['nested', 'two']],
  ['nested/three', ['nested', 'three']],
  ['nested/three/four', ['nested', 'three', 'four']],
  ['@signal(withEverything)-1', ['withEverything', '@signal-1']],
  ['withEverything', ['withEverything']],
  [
    '@signal(withEverything/withParams-[11])-4',
    ['withEverything', 'withParams', '[11]', '@signal-4'],
  ],
  ['withEverything/withParams-[11]', ['withEverything', 'withParams', '[11]']],
  [
    '@signal(withEverything/withScope)-7',
    ['withEverything', 'withScope', '@signal-7'],
  ],
  [
    'withEverything/withScope-@scope("simple-context-value")',
    ['withEverything', 'withScope', '@scope-"simple-context-value"'],
  ],
  [
    '@signal(withEverything/withParamsAndScope-[22])-10',
    ['withEverything', 'withParamsAndScope', '[22]', '@signal-10'],
  ],
  [
    'withEverything/withParamsAndScope-[22]',
    ['withEverything', 'withParamsAndScope', '[22]'],
  ],
  ['@signal()-13', ['@signal', '13']],
  ['@signal()-14', ['@signal', '14']],
  ['1', ['1']],
  ['withScope-@scope(1)', ['withScope', '@scope-1']],
  ['@component(MyComponent)-:r0:', ['@component', 'MyComponent', ':r0:']],
  [
    'simple/atom/with/params-[21]',
    ['simple', 'atom', 'with', 'params', '[21]'],
  ],
  ['@component(MyComponent)-:r1:', ['@component', 'MyComponent', ':r1:']],
  [
    'simple/atom/with/scope-@scope("some context value")',
    ['simple', 'atom', 'with', 'scope', '@scope-"some context value"'],
  ],
  ['@component(MyComponent)-:r2:', ['@component', 'MyComponent', ':r2:']],
  [
    'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
    [
      'simple',
      'atom',
      'with',
      'params',
      'and',
      'scope',
      '[42]',
      '@scope-"some context value"',
    ],
  ],
  ['@component(MyComponent)-:r3:', ['@component', 'MyComponent', ':r3:']],
  ['@component(MyComponent)-:r4:', ['@component', 'MyComponent', ':r4:']],
  [
    '@signal(withEverything/withParams-[21])-16',
    ['withEverything', 'withParams', '[21]', '@signal-16'],
  ],
  ['withEverything/withParams-[21]', ['withEverything', 'withParams', '[21]']],
  ['@component(MyComponent)-:r5:', ['@component', 'MyComponent', ':r5:']],
  [
    '@signal(withEverything/withScope)-19',
    ['withEverything', 'withScope', '@signal-19'],
  ],
  [
    'withEverything/withScope-@scope("some context value")',
    ['withEverything', 'withScope', '@scope-"some context value"'],
  ],
  ['@component(MyComponent)-:r6:', ['@component', 'MyComponent', ':r6:']],
  [
    '@signal(withEverything/withParamsAndScope-[42])-22',
    ['withEverything', 'withParamsAndScope', '[42]', '@signal-22'],
  ],
  [
    'withEverything/withParamsAndScope-[42]',
    ['withEverything', 'withParamsAndScope', '[42]'],
  ],
  ['@component(MyComponent)-:r7:', ['@component', 'MyComponent', ':r7:']],
  ['@signal(with/signal)-25', ['with', 'signal', '@signal-25']],
  ['with/signal', ['with', 'signal']],
  [
    '@listener(@signal(with/signal)-25)-26',
    ['with', 'signal', '@signal-25', '@listener-26'],
  ],
  ['something', ['something']],
  ['@selector(namedFnSelector)-27', ['@selector', 'namedFnSelector', '27']],
  ['@selector(unknown)-28', ['@selector', 'unknown', '28']],
  [
    '@selector(otherNamedFnSelector)-29',
    ['@selector', 'otherNamedFnSelector', '29'],
  ],
  ['@signal(with/signal/2)-30', ['with', 'signal', '2', '@signal-30']],
  ['with/signal/2', ['with', 'signal', '2']],
];

describe('parseNodeGroupNames', () => {
  it('should test all benchmarks atoms', () => {
    expect(TESTS.map(([nodeId]) => nodeId)).toEqual(LOTS_OF_ATOMS_IDS);
  });

  it.each(TESTS)('%s should be parsed', (nodeId, expectedNodeIds) => {
    expect(parseNodeGroupNames(nodeId)).toEqual(expectedNodeIds);
  });
});
