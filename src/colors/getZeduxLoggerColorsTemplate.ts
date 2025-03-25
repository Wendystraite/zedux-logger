import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';

export function getZeduxLoggerColorsTemplate(colors: {
  normal?: string;
  red: string;
  gray: string;
  blue: string;
  amber: string;
  green: string;
  orange: string;
  purple: string;
}): Pick<CompleteZeduxLoggerLocalOptions, 'colors'> {
  const {
    normal = 'inherit',
    red,
    gray,
    blue,
    amber,
    green,
    orange,
    purple,
  } = colors;
  return {
    colors: {
      default: gray,
      ecosystemResetStart: orange,
      ecosystemResetEnd: orange,
      initializing: purple,
      initializingPromise: purple,
      initialized: blue,
      active: blue,
      stale: amber,
      destroyed: red,
      invalidate: amber,
      changed: green,
      promiseChange: green,
      promiseChangeLoading: purple,
      promiseChangeSuccess: green,
      promiseChangeError: red,
      error: red,
      unknown: red,
      edgeCreated: gray,
      edgeUpdated: gray,
      edgeRemoved: gray,
      evaluating: gray,
      evaluated: gray,
      waitingForPromisesNodes: purple,
      ecosystemName: gray,
      operation: normal,
      executionTimeNormal: normal,
      executionTimeSlow: amber,
      executionTimeVerySlow: red,
      atomNameNamespace: gray,
      atomNameLastNamespace: normal,
      atomNameParams: gray,
      atomNameScope: gray,
      atomNameSignalUid: gray,
      atomNameReactComponentName: normal,
      atomNameSelectorName: normal,
      atomNameSelectorUid: gray,
      atomNameListenerUid: gray,
      ttl: normal,
      oldState: normal,
      newState: normal,
      diffCreate: green,
      diffRemove: red,
      diffChange: blue,
      groupOldState: gray,
      groupNewState: green,
      groupSnapshot: green,
    },
  };
}
