import { describe, expect, test } from 'vitest';

import {
  type AtomName,
  parseAtomName,
} from '../src/parseAtomName/parseAtomName.js';

describe('parseAtomName', () => {
  test.each<
    [caseName: string, name: string | undefined, parsed: AtomName | undefined]
  >([
    ['undefined', undefined, undefined],
    [
      'signal with params',
      `@signal(ui/selectedApiDefinitionFieldsNamesAtom/selectedApiDefinitionFieldsNames-["UserApiDefinition",1])-7layrpu`,
      {
        type: 'signal',
        fullAtomName:
          '@signal(ui/selectedApiDefinitionFieldsNamesAtom/selectedApiDefinitionFieldsNames-["UserApiDefinition",1])-7layrpu',
        atomName:
          'ui/selectedApiDefinitionFieldsNamesAtom/selectedApiDefinitionFieldsNames',
        namespaces: [
          'ui',
          'selectedApiDefinitionFieldsNamesAtom',
          'selectedApiDefinitionFieldsNames',
        ],
        params: '"UserApiDefinition",1',
        signalUid: '7layrpu',
      },
    ],
    [
      'signal without params',
      `@signal(ui/selectedApiDefinitionFieldsNamesAtom/selectedApiDefinitionFieldsNames)-7layrpu`,
      {
        type: 'signal',
        fullAtomName:
          '@signal(ui/selectedApiDefinitionFieldsNamesAtom/selectedApiDefinitionFieldsNames)-7layrpu',
        atomName:
          'ui/selectedApiDefinitionFieldsNamesAtom/selectedApiDefinitionFieldsNames',
        namespaces: [
          'ui',
          'selectedApiDefinitionFieldsNamesAtom',
          'selectedApiDefinitionFieldsNames',
        ],
        params: undefined,
        signalUid: '7layrpu',
      },
    ],
    [
      'simple atom',
      `count`,
      {
        type: 'user',
        fullAtomName: 'count',
        atomName: 'count',
        namespaces: ['count'],
        params: undefined,
        scope: undefined,
      },
    ],
    [
      'atom with params',
      `fw/allApiDefinitionsAtom/allApiDefinitionFields-["OperatorApiDefinition"]`,
      {
        type: 'user',
        fullAtomName:
          'fw/allApiDefinitionsAtom/allApiDefinitionFields-["OperatorApiDefinition"]',
        atomName: 'fw/allApiDefinitionsAtom/allApiDefinitionFields',
        namespaces: ['fw', 'allApiDefinitionsAtom', 'allApiDefinitionFields'],
        params: '"OperatorApiDefinition"',
        scope: undefined,
      },
    ],
    [
      'atom without params',
      `fw/allApiDefinitionsAtom/allApiDefinitionFields`,
      {
        type: 'user',
        fullAtomName: 'fw/allApiDefinitionsAtom/allApiDefinitionFields',
        atomName: 'fw/allApiDefinitionsAtom/allApiDefinitionFields',
        namespaces: ['fw', 'allApiDefinitionsAtom', 'allApiDefinitionFields'],
        params: undefined,
        scope: undefined,
      },
    ],
    [
      'selector with params',
      `@@selector-selectApiDefinitionFromName-18qqpsiw-["LIB_01ApiDefinition"]`,
      {
        type: 'selector',
        fullAtomName:
          '@@selector-selectApiDefinitionFromName-18qqpsiw-["LIB_01ApiDefinition"]',
        atomName: 'selectApiDefinitionFromName',
        namespaces: ['selectApiDefinitionFromName'],
        selectorName: 'selectApiDefinitionFromName',
        params: '"LIB_01ApiDefinition"',
        selectorUid: '18qqpsiw',
      },
    ],
    [
      'selector without params',
      `@@selector-selectApiDefinitionFromName-18qqpsiw`,
      {
        type: 'selector',
        fullAtomName: '@@selector-selectApiDefinitionFromName-18qqpsiw',
        atomName: 'selectApiDefinitionFromName',
        namespaces: ['selectApiDefinitionFromName'],
        selectorName: 'selectApiDefinitionFromName',
        params: undefined,
        selectorUid: '18qqpsiw',
      },
    ],
    [
      'react component',
      `rc-:r2:`,
      {
        type: 'component',
        fullAtomName: 'rc-:r2:',
        componentName: 'rc',
        componentUid: 'r2',
      },
    ],
    [
      'named react component',
      `DefinitionFieldRender2-:r35:`,
      {
        type: 'component',
        fullAtomName: 'DefinitionFieldRender2-:r35:',
        componentName: 'DefinitionFieldRender2',
        componentUid: 'r35',
      },
    ],
    [
      'atom with params with scope',
      `fw/ApiDefinitionField/UserApiDefinition.firstName_lastName.label-["k_visitor"]-@scope("anonFn-39hewlsf")`,
      {
        type: 'user',
        fullAtomName:
          'fw/ApiDefinitionField/UserApiDefinition.firstName_lastName.label-["k_visitor"]-@scope("anonFn-39hewlsf")',
        atomName:
          'fw/ApiDefinitionField/UserApiDefinition.firstName_lastName.label',
        namespaces: [
          'fw',
          'ApiDefinitionField',
          'UserApiDefinition.firstName_lastName.label',
        ],
        params: '"k_visitor"',
        scope: '"anonFn-39hewlsf"',
      },
    ],
    [
      'atom without params with scope',
      `fw/ApiDefinitionField/TimeSlotApiDefinition.name.label-@scope("anonFn-19oqz9as")`,
      {
        type: 'user',
        fullAtomName:
          'fw/ApiDefinitionField/TimeSlotApiDefinition.name.label-@scope("anonFn-19oqz9as")',
        atomName: 'fw/ApiDefinitionField/TimeSlotApiDefinition.name.label',
        namespaces: [
          'fw',
          'ApiDefinitionField',
          'TimeSlotApiDefinition.name.label',
        ],
        params: undefined,
        scope: '"anonFn-19oqz9as"',
      },
    ],
  ])('%s should be parsed', (_caseName, atomName, expectedAtomNames) => {
    expect(parseAtomName(atomName)).toEqual(expectedAtomNames);
  });
});
