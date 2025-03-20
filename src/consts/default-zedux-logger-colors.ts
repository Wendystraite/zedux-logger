import type { ZeduxLoggerColors } from '../types/ZeduxLoggerColors.js';

/**
 * Colors from tailwindcss.
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

export const DEFAULT_ZEDUX_LOGGER_COLORS: ZeduxLoggerColors = {
  default: MUTED_COLOR,
  ecosystemResetStart: ORANGE,
  ecosystemResetEnd: ORANGE,
  initializing: PURPLE,
  initializingPromise: PURPLE,
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
  error: RED,
  unknown: RED,
  edgeCreated: MUTED_COLOR,
  edgeUpdated: MUTED_COLOR,
  edgeRemoved: MUTED_COLOR,
  evaluating: MUTED_COLOR,
  evaluated: MUTED_COLOR,
  waitingForPromisesNodes: PURPLE,
  ecosystemName: GRAY,
  operation: NORMAL_COLOR,
  executionTimeNormal: NORMAL_COLOR,
  executionTimeSlow: AMBER,
  executionTimeVerySlow: RED,
  atomNameNamespace: MUTED_COLOR,
  atomNameLastNamespace: NORMAL_COLOR,
  atomNameParams: MUTED_COLOR,
  atomNameScope: MUTED_COLOR,
  atomNameSignalUid: MUTED_COLOR,
  atomNameReactComponentName: NORMAL_COLOR,
  atomNameSelectorName: NORMAL_COLOR,
  atomNameSelectorUid: MUTED_COLOR,
  atomNameListenerUid: MUTED_COLOR,
  ttl: NORMAL_COLOR,
  oldState: NORMAL_COLOR,
  newState: NORMAL_COLOR,
  diffCreate: GREEN,
  diffRemove: RED,
  diffChange: BLUE,
  groupOldState: MUTED_COLOR,
  groupNewState: GREEN,
  groupOldSnapshot: MUTED_COLOR,
  groupNewSnapshot: GREEN,
};
