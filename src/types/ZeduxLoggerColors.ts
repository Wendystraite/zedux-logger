/**
 * Colors used in the logs.
 */
import type { DeepRequired } from './DeepRequired.js';

export interface ZeduxLoggerColors {
  /** Default color used in all logs */
  default: string;
  /** If `showInSummary.showSummary` is `true` ; when resetting ecosystem on {@link Zedux.ResetStartEvent} */
  ecosystemResetStart: string;
  /** If `showInSummary.showSummary` is `true` ; after resetting ecosystem on {@link Zedux.ResetEndEvent} */
  ecosystemResetEnd: string;
  /** If `showInSummary.showSummary` is `true` ; when initializing an atom on {@link Zedux.CycleEvent} with newStatus to `Initializing` */
  initializing: string;
  /** If `showInSummary.showSummary` is `true` ; when initializing an atom that has running promises as dependencies on {@link Zedux.CycleEvent} with newStatus to `Active` */
  initializingPromise: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom initialized on {@link Zedux.CycleEvent} with oldStatus to `Initializing` and newStatus to `Active` */
  initialized: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom become active on {@link Zedux.CycleEvent} with newStatus to `Active` */
  active: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom become stale on {@link Zedux.CycleEvent} with newStatus to `Stale` */
  stale: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom is destroyed on {@link Zedux.CycleEvent} with newStatus to `Destroyed` */
  destroyed: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom is invalidated on {@link Zedux.InvalidateEvent} */
  invalidate: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom's state changed on {@link Zedux.ChangeEvent} */
  changed: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom's promise change on {@link Zedux.PromiseChangeEvent} with promise's status to `undefined` */
  promiseChange: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom's promise is loading on {@link Zedux.PromiseChangeEvent} with promise's status to `loading` */
  promiseChangeLoading: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom's promise resolved on {@link Zedux.PromiseChangeEvent} with promise's status to `success` */
  promiseChangeSuccess: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom's promise rejected on {@link Zedux.PromiseChangeEvent} with promise's status to `error` */
  promiseChangeError: string;
  /** If `showInSummary.showSummary` is `true` ; when an error occurred on {@link Zedux.ErrorEvent} */
  error: string;
  /** If `showInSummary.showSummary` is `true` ; when an unknown event occurred from {@link Zedux.EcosystemEvents} */
  unknown: string;
  /** If `showInSummary.showSummary` is `true` ; when a graph edge is created on {@link Zedux.EdgeEvent} with action to `add` */
  edgeCreated: string;
  /** If `showInSummary.showSummary` is `true` ; when a graph edge is updated on {@link Zedux.EdgeEvent} with action to `update` */
  edgeUpdated: string;
  /** If `showInSummary.showSummary` is `true` ; when a graph edge is removed on {@link Zedux.EdgeEvent} with action to `remove` */
  edgeRemoved: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom evaluation starts on {@link Zedux.RunStartEvent} */
  evaluating: string;
  /** If `showInSummary.showSummary` is `true` ; when an atom evaluation completes on {@link Zedux.RunEndEvent} */
  evaluated: string;
  /** If `showInSummary.showWaitingPromises` is `true` ; when an atom has running promises as dependencies */
  waitingForPromisesNodes: string;
  /** If `showInSummary.showEcosystemName` is `true` ; color of the ecosystem's name */
  ecosystemName: string;
  /** If `showInSummary.showOperation` is `true` ; color of the zedux operation's name ({@link Zedux.EventBase['operation']}) */
  operation: string;
  /** If `showInSummary.showExecutionTime` is `true` ; color of the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent} if `executionTimeOptions.slowThresholdMs` is not exceeded */
  executionTimeNormal: string;
  /** If `showInSummary.showExecutionTime` is `true` ; color of the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent} if `executionTimeOptions.slowThresholdMs` is exceeded */
  executionTimeSlow: string;
  /** If `showInSummary.showExecutionTime` is `true` ; color of the time taken between {@link Zedux.RunStartEvent} and {@link Zedux.RunEndEvent} if `executionTimeOptions.verySlowThresholdMs` is exceeded */
  executionTimeVerySlow: string;
  /** Color for atom namespace parts except the last one */
  atomNameNamespace: string;
  /** Color for the last part of atom namespace */
  atomNameLastNamespace: string;
  /** Color for atom parameters */
  atomNameParams: string;
  /** Color for atom scope */
  atomNameScope: string;
  /** Color for signal unique identifier */
  atomNameSignalUid: string;
  /** Color for selector name */
  atomNameSelectorName: string;
  /** Color for React component name */
  atomNameReactComponentName: string;
  /** Color for selector unique identifier */
  atomNameSelectorUid: string;
  /** Color for listener unique identifier */
  atomNameListenerUid: string;
  /** If `showInSummary.showTtl` is `true` ; color of the time-to-live value */
  ttl: string;
  /** If `showInSummary.showOldState` is `true` ; color of the old state */
  oldState: string;
  /** If `showInSummary.showNewState` is `true` ; color of the new state */
  newState: string;
  /** Color for created entries in minidiff's state diff */
  diffCreate: string;
  /** Color for removed entries in minidiff's state diff */
  diffRemove: string;
  /** Color for changed entries in minidiff's state diff */
  diffChange: string;
  /** If `showInDetails.showOldState` is `true` ; color for old state group header */
  groupOldState: string;
  /** If `showInDetails.showNewState` is `true` ; color for new state group header */
  groupNewState: string;
  /** If `showInDetails.showSnapshot` is `true` ; color for new snapshot group header */
  groupSnapshot: string;
}

export type CompleteZeduxLoggerColors = DeepRequired<ZeduxLoggerColors>;
