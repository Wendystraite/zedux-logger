/**
 * @see https://tailwindcss.com/docs/colors
 */

export const NORMAL_COLOR = `color: inherit; font-weight: normal;`;
export const MUTED_COLOR = `color: #6a7282; font-weight: lighter;`;
export const RED = `color: #fb2c36; font-weight: normal;`;
export const GRAY = `color: #6a7282; font-weight: normal;`;
export const BLUE = `color: #2b7fff; font-weight: normal;`;
export const AMBER = `color: #fe9a00; font-weight: normal;`;
export const GREEN = `color: #00c951; font-weight: normal;`;
export const ORANGE = `color: #ff6900; font-weight: normal;`;
export const PURPLE = `color: #ad46ff; font-weight: normal;`;

export const ZEDUX_LOGGER_COLORS = {
  default: MUTED_COLOR,
  ecosystemResetStart: ORANGE,
  ecosystemResetEnd: ORANGE,
  ecosystemDestroyStart: RED,
  ecosystemDestroyEnd: RED,
  initializing: PURPLE,
  initialized: BLUE,
  active: BLUE,
  stale: AMBER,
  destroyed: RED,
  invalidate: AMBER,
  changed: GREEN,
  promiseChange: GREEN,
  promiseChangeLoading: PURPLE,
  promiseChangeSuccess: GREEN,
  promiseChangeError: RED,
  nodeWaitingAnotherNodePromise: PURPLE,
  error: RED,
  unknown: RED,
  ecosystemName: GRAY,
  atomFullName: NORMAL_COLOR,
  operation: NORMAL_COLOR,
  atomNameNamespace: MUTED_COLOR,
  atomNameLastNamespace: NORMAL_COLOR,
  atomNameParams: MUTED_COLOR,
  atomNameScope: MUTED_COLOR,
  atomNameSignalUid: MUTED_COLOR,
  atomNameSelectorName: NORMAL_COLOR,
  atomNameReactComponentName: NORMAL_COLOR,
  atomNameSelectorUid: MUTED_COLOR,
  atomNameListenerUid: MUTED_COLOR,
  ttl: NORMAL_COLOR,
  oldState: NORMAL_COLOR,
  newState: NORMAL_COLOR,
  observer: NORMAL_COLOR,
  diffCreate: GREEN,
  diffRemove: RED,
  diffChange: BLUE,

  groupOldState: MUTED_COLOR,
  groupEvent: BLUE,
  groupNewState: GREEN,
  groupReasons: NORMAL_COLOR,
  groupOldSnapshot: MUTED_COLOR,
  groupNewSnapshot: GREEN,
  edgeCreated: MUTED_COLOR,
  edgeUpdated: MUTED_COLOR,
  edgeRemoved: MUTED_COLOR,
  evaluating: MUTED_COLOR,
  evaluated: MUTED_COLOR,
  instanceReused: MUTED_COLOR,
};
