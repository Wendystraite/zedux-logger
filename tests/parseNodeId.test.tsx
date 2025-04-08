import { describe, expect, it } from 'vitest';

import {
  type ParsedNodeId,
  parseNodeId,
} from '../src/parseAtomId/parseNodeId.js';
import { LOTS_OF_ATOMS_IDS } from './addLotsOfAtomsInEcosystem.js';

const TESTS: Array<[nodeId: string, parsedNodeId: ParsedNodeId]> = [
  [
    'atomNumber/0',
    {
      id: 'atomNumber/0',
      name: 'atomNumber/0',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/1',
    {
      id: 'atomNumber/1',
      name: 'atomNumber/1',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/2',
    {
      id: 'atomNumber/2',
      name: 'atomNumber/2',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/3',
    {
      id: 'atomNumber/3',
      name: 'atomNumber/3',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/4',
    {
      id: 'atomNumber/4',
      name: 'atomNumber/4',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/5',
    {
      id: 'atomNumber/5',
      name: 'atomNumber/5',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/6',
    {
      id: 'atomNumber/6',
      name: 'atomNumber/6',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/7',
    {
      id: 'atomNumber/7',
      name: 'atomNumber/7',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/8',
    {
      id: 'atomNumber/8',
      name: 'atomNumber/8',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'atomNumber/9',
    {
      id: 'atomNumber/9',
      name: 'atomNumber/9',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'simple atom',
    {
      id: 'simple atom',
      name: 'simple atom',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'nested/one',
    {
      id: 'nested/one',
      name: 'nested/one',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'nested/two',
    {
      id: 'nested/two',
      name: 'nested/two',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'nested/three',
    {
      id: 'nested/three',
      name: 'nested/three',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'nested/three/four',
    {
      id: 'nested/three/four',
      name: 'nested/three/four',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@signal(withEverything)-1',
    {
      id: '@signal(withEverything)-1',
      subNode: {
        id: 'withEverything',
        name: 'withEverything',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '1',
      type: '@signal',
      wrapped: 'withEverything',
    },
  ],
  [
    '@memo(withEverything)-2',
    {
      id: '@memo(withEverything)-2',
      subNode: {
        id: 'withEverything',
        name: 'withEverything',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '2',
      type: '@memo',
      wrapped: 'withEverything',
    },
  ],
  [
    '@memo(withEverything)-3',
    {
      id: '@memo(withEverything)-3',
      subNode: {
        id: 'withEverything',
        name: 'withEverything',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '3',
      type: '@memo',
      wrapped: 'withEverything',
    },
  ],
  [
    'withEverything',
    {
      id: 'withEverything',
      name: 'withEverything',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@signal(withEverything/withParams-[11])-4',
    {
      id: '@signal(withEverything/withParams-[11])-4',
      subNode: {
        id: 'withEverything/withParams-[11]',
        name: 'withEverything/withParams',
        params: '11',
        scope: undefined,
        type: '@atom',
      },
      suffix: '4',
      type: '@signal',
      wrapped: 'withEverything/withParams-[11]',
    },
  ],
  [
    '@memo(withEverything/withParams-[11])-5',
    {
      id: '@memo(withEverything/withParams-[11])-5',
      subNode: {
        id: 'withEverything/withParams-[11]',
        name: 'withEverything/withParams',
        params: '11',
        scope: undefined,
        type: '@atom',
      },
      suffix: '5',
      type: '@memo',
      wrapped: 'withEverything/withParams-[11]',
    },
  ],
  [
    '@memo(withEverything/withParams-[11])-6',
    {
      id: '@memo(withEverything/withParams-[11])-6',
      subNode: {
        id: 'withEverything/withParams-[11]',
        name: 'withEverything/withParams',
        params: '11',
        scope: undefined,
        type: '@atom',
      },
      suffix: '6',
      type: '@memo',
      wrapped: 'withEverything/withParams-[11]',
    },
  ],
  [
    'withEverything/withParams-[11]',
    {
      id: 'withEverything/withParams-[11]',
      name: 'withEverything/withParams',
      params: '11',
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@signal(withEverything/withScope)-7',
    {
      id: '@signal(withEverything/withScope)-7',
      subNode: {
        id: 'withEverything/withScope',
        name: 'withEverything/withScope',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '7',
      type: '@signal',
      wrapped: 'withEverything/withScope',
    },
  ],
  [
    '@memo(withEverything/withScope)-8',
    {
      id: '@memo(withEverything/withScope)-8',
      subNode: {
        id: 'withEverything/withScope',
        name: 'withEverything/withScope',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '8',
      type: '@memo',
      wrapped: 'withEverything/withScope',
    },
  ],
  [
    '@memo(withEverything/withScope)-9',
    {
      id: '@memo(withEverything/withScope)-9',
      subNode: {
        id: 'withEverything/withScope',
        name: 'withEverything/withScope',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '9',
      type: '@memo',
      wrapped: 'withEverything/withScope',
    },
  ],
  [
    'withEverything/withScope-@scope("simple-context-value")',
    {
      id: 'withEverything/withScope-@scope("simple-context-value")',
      name: 'withEverything/withScope',
      params: undefined,
      scope: '"simple-context-value"',
      type: '@atom',
    },
  ],
  [
    '@signal(withEverything/withParamsAndScope-[22])-10',
    {
      id: '@signal(withEverything/withParamsAndScope-[22])-10',
      subNode: {
        id: 'withEverything/withParamsAndScope-[22]',
        name: 'withEverything/withParamsAndScope',
        params: '22',
        scope: undefined,
        type: '@atom',
      },
      suffix: '10',
      type: '@signal',
      wrapped: 'withEverything/withParamsAndScope-[22]',
    },
  ],
  [
    '@memo(withEverything/withParamsAndScope-[22])-11',
    {
      id: '@memo(withEverything/withParamsAndScope-[22])-11',
      subNode: {
        id: 'withEverything/withParamsAndScope-[22]',
        name: 'withEverything/withParamsAndScope',
        params: '22',
        scope: undefined,
        type: '@atom',
      },
      suffix: '11',
      type: '@memo',
      wrapped: 'withEverything/withParamsAndScope-[22]',
    },
  ],
  [
    '@memo(withEverything/withParamsAndScope-[22])-12',
    {
      id: '@memo(withEverything/withParamsAndScope-[22])-12',
      subNode: {
        id: 'withEverything/withParamsAndScope-[22]',
        name: 'withEverything/withParamsAndScope',
        params: '22',
        scope: undefined,
        type: '@atom',
      },
      suffix: '12',
      type: '@memo',
      wrapped: 'withEverything/withParamsAndScope-[22]',
    },
  ],
  [
    'withEverything/withParamsAndScope-[22]',
    {
      id: 'withEverything/withParamsAndScope-[22]',
      name: 'withEverything/withParamsAndScope',
      params: '22',
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@signal()-13',
    {
      id: '@signal()-13',
      subNode: undefined,
      suffix: '13',
      type: '@signal',
      wrapped: '',
    },
  ],
  [
    '@signal()-14',
    {
      id: '@signal()-14',
      subNode: undefined,
      suffix: '14',
      type: '@signal',
      wrapped: '',
    },
  ],
  [
    '@memo(1)-15',
    {
      id: '@memo(1)-15',
      subNode: {
        id: '1',
        name: '1',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '15',
      type: '@memo',
      wrapped: '1',
    },
  ],
  [
    '1',
    {
      id: '1',
      name: '1',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    'withScope-@scope(1)',
    {
      id: 'withScope-@scope(1)',
      name: 'withScope',
      params: undefined,
      scope: '1',
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r0:',
    {
      id: '@component(MyComponent)-:r0:',
      suffix: ':r0:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    'simple/atom/with/params-[21]',
    {
      id: 'simple/atom/with/params-[21]',
      name: 'simple/atom/with/params',
      params: '21',
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r1:',
    {
      id: '@component(MyComponent)-:r1:',
      suffix: ':r1:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    'simple/atom/with/scope-@scope("some context value")',
    {
      id: 'simple/atom/with/scope-@scope("some context value")',
      name: 'simple/atom/with/scope',
      params: undefined,
      scope: '"some context value"',
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r2:',
    {
      id: '@component(MyComponent)-:r2:',
      suffix: ':r2:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
    {
      id: 'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
      name: 'simple/atom/with/params/and/scope',
      params: '42',
      scope: '"some context value"',
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r3:',
    {
      id: '@component(MyComponent)-:r3:',
      suffix: ':r3:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    '@component(MyComponent)-:r4:',
    {
      id: '@component(MyComponent)-:r4:',
      suffix: ':r4:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    '@signal(withEverything/withParams-[21])-16',
    {
      id: '@signal(withEverything/withParams-[21])-16',
      subNode: {
        id: 'withEverything/withParams-[21]',
        name: 'withEverything/withParams',
        params: '21',
        scope: undefined,
        type: '@atom',
      },
      suffix: '16',
      type: '@signal',
      wrapped: 'withEverything/withParams-[21]',
    },
  ],
  [
    '@memo(withEverything/withParams-[21])-17',
    {
      id: '@memo(withEverything/withParams-[21])-17',
      subNode: {
        id: 'withEverything/withParams-[21]',
        name: 'withEverything/withParams',
        params: '21',
        scope: undefined,
        type: '@atom',
      },
      suffix: '17',
      type: '@memo',
      wrapped: 'withEverything/withParams-[21]',
    },
  ],
  [
    '@memo(withEverything/withParams-[21])-18',
    {
      id: '@memo(withEverything/withParams-[21])-18',
      subNode: {
        id: 'withEverything/withParams-[21]',
        name: 'withEverything/withParams',
        params: '21',
        scope: undefined,
        type: '@atom',
      },
      suffix: '18',
      type: '@memo',
      wrapped: 'withEverything/withParams-[21]',
    },
  ],
  [
    'withEverything/withParams-[21]',
    {
      id: 'withEverything/withParams-[21]',
      name: 'withEverything/withParams',
      params: '21',
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r5:',
    {
      id: '@component(MyComponent)-:r5:',
      suffix: ':r5:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    '@signal(withEverything/withScope)-19',
    {
      id: '@signal(withEverything/withScope)-19',
      subNode: {
        id: 'withEverything/withScope',
        name: 'withEverything/withScope',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '19',
      type: '@signal',
      wrapped: 'withEverything/withScope',
    },
  ],
  [
    '@memo(withEverything/withScope)-20',
    {
      id: '@memo(withEverything/withScope)-20',
      subNode: {
        id: 'withEverything/withScope',
        name: 'withEverything/withScope',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '20',
      type: '@memo',
      wrapped: 'withEverything/withScope',
    },
  ],
  [
    '@memo(withEverything/withScope)-21',
    {
      id: '@memo(withEverything/withScope)-21',
      subNode: {
        id: 'withEverything/withScope',
        name: 'withEverything/withScope',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '21',
      type: '@memo',
      wrapped: 'withEverything/withScope',
    },
  ],
  [
    'withEverything/withScope-@scope("some context value")',
    {
      id: 'withEverything/withScope-@scope("some context value")',
      name: 'withEverything/withScope',
      params: undefined,
      scope: '"some context value"',
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r6:',
    {
      id: '@component(MyComponent)-:r6:',
      suffix: ':r6:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    '@signal(withEverything/withParamsAndScope-[42])-22',
    {
      id: '@signal(withEverything/withParamsAndScope-[42])-22',
      subNode: {
        id: 'withEverything/withParamsAndScope-[42]',
        name: 'withEverything/withParamsAndScope',
        params: '42',
        scope: undefined,
        type: '@atom',
      },
      suffix: '22',
      type: '@signal',
      wrapped: 'withEverything/withParamsAndScope-[42]',
    },
  ],
  [
    '@memo(withEverything/withParamsAndScope-[42])-23',
    {
      id: '@memo(withEverything/withParamsAndScope-[42])-23',
      subNode: {
        id: 'withEverything/withParamsAndScope-[42]',
        name: 'withEverything/withParamsAndScope',
        params: '42',
        scope: undefined,
        type: '@atom',
      },
      suffix: '23',
      type: '@memo',
      wrapped: 'withEverything/withParamsAndScope-[42]',
    },
  ],
  [
    '@memo(withEverything/withParamsAndScope-[42])-24',
    {
      id: '@memo(withEverything/withParamsAndScope-[42])-24',
      subNode: {
        id: 'withEverything/withParamsAndScope-[42]',
        name: 'withEverything/withParamsAndScope',
        params: '42',
        scope: undefined,
        type: '@atom',
      },
      suffix: '24',
      type: '@memo',
      wrapped: 'withEverything/withParamsAndScope-[42]',
    },
  ],
  [
    'withEverything/withParamsAndScope-[42]',
    {
      id: 'withEverything/withParamsAndScope-[42]',
      name: 'withEverything/withParamsAndScope',
      params: '42',
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@component(MyComponent)-:r7:',
    {
      id: '@component(MyComponent)-:r7:',
      suffix: ':r7:',
      type: '@component',
      wrapped: 'MyComponent',
    },
  ],
  [
    '@signal(with/signal)-25',
    {
      id: '@signal(with/signal)-25',
      subNode: {
        id: 'with/signal',
        name: 'with/signal',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '25',
      type: '@signal',
      wrapped: 'with/signal',
    },
  ],
  [
    'with/signal',
    {
      id: 'with/signal',
      name: 'with/signal',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@listener(@signal(with/signal)-25)-26',
    {
      id: '@listener(@signal(with/signal)-25)-26',
      subNode: {
        id: '@signal(with/signal)-25',
        subNode: {
          id: 'with/signal',
          name: 'with/signal',
          params: undefined,
          scope: undefined,
          type: '@atom',
        },
        suffix: '25',
        type: '@signal',
        wrapped: 'with/signal',
      },
      suffix: '26',
      type: '@listener',
      wrapped: '@signal(with/signal)-25',
    },
  ],
  [
    'something',
    {
      id: 'something',
      name: 'something',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
  [
    '@selector(namedFnSelector)-27',
    {
      id: '@selector(namedFnSelector)-27',
      suffix: '27',
      type: '@selector',
      wrapped: 'namedFnSelector',
    },
  ],
  [
    '@selector(unknown)-28',
    {
      id: '@selector(unknown)-28',
      suffix: '28',
      type: '@selector',
      wrapped: 'unknown',
    },
  ],
  [
    '@selector(otherNamedFnSelector)-29',
    {
      id: '@selector(otherNamedFnSelector)-29',
      suffix: '29',
      type: '@selector',
      wrapped: 'otherNamedFnSelector',
    },
  ],
  [
    '@signal(with/signal/2)-30',
    {
      id: '@signal(with/signal/2)-30',
      subNode: {
        id: 'with/signal/2',
        name: 'with/signal/2',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: '30',
      type: '@signal',
      wrapped: 'with/signal/2',
    },
  ],
  [
    'with/signal/2',
    {
      id: 'with/signal/2',
      name: 'with/signal/2',
      params: undefined,
      scope: undefined,
      type: '@atom',
    },
  ],
];

describe('parseNodeId', () => {
  it('should test all benchmarks atoms', () => {
    expect(TESTS.map(([nodeId]) => nodeId)).toEqual(LOTS_OF_ATOMS_IDS);
  });

  it('should return undefined if undefined is passed', () => {
    expect(parseNodeId(undefined)).toBeUndefined();
  });

  it('should parse node id with spaces', () => {
    expect(parseNodeId('atom with spaces')).toEqual({
      id: 'atom with spaces',
      name: 'atom with spaces',
      params: undefined,
      scope: undefined,
      type: '@atom',
    });
  });

  it('should parse built-in node id with spaces', () => {
    expect(parseNodeId('@signal(with spaces)')).toEqual({
      id: '@signal(with spaces)',
      subNode: {
        id: 'with spaces',
        name: 'with spaces',
        params: undefined,
        scope: undefined,
        type: '@atom',
      },
      suffix: undefined,
      type: '@signal',
      wrapped: 'with spaces',
    });
  });

  it.each(TESTS)('%s should be parsed', (nodeId, expectedAtomNames) => {
    expect(parseNodeId(nodeId)).toEqual(expectedAtomNames);
  });
});
