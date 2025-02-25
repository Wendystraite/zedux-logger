export type AtomName =
  | SelectorAtomName
  | SignalAtomName
  | ReactComponentAtomName
  | UserAtomName
  | ListenerAtomName;

export interface BaseAtomName {
  /**
   * The full atom name given to {@link parseAtomName}.
   */
  fullAtomName: string;
}

/**
 * @see {Selector}
 *
 * Ex: "@@selector-selectSomething-7layrpu"
 */
export interface SelectorAtomName extends InternalAtomName {
  type: 'selector';

  /** Ex: "selectSomething" */
  selectorName: string;

  /** Ex: "7layrpu" */
  selectorUid: string;
}

/**
 * @see {Signal}
 *
 * Ex: "@signal(mySignal)-7layrpu"
 */
export interface SignalAtomName extends InternalAtomName {
  type: 'signal';

  /** Ex: "7layrpu" */
  signalUid: string;
}

/**
 * @see {React.Component}
 *
 * Ex: "MyComponent-:r2:"
 */
export interface ReactComponentAtomName extends BaseAtomName {
  type: 'component';

  /** Ex: "MyComponent" */
  componentName: string;

  /** Ex: "r2" */
  componentUid: string;
}

/**
 * @see Listener
 *
 * Ex: "no-5val4e0"
 */
export interface ListenerAtomName extends BaseAtomName {
  type: 'listener';

  /** Ex: "5val4e0" */
  listenerUid: string;
}

/**
 * @see {atom}
 *
 * Ex: "myAtomNamespace/myAtom-["myParam"]-@scope("myScope")"
 */
export interface UserAtomName extends InternalAtomName {
  type: 'user';

  /** Ex: "myScope" */
  scope: string | undefined;
}

/**
 * Ex: "myAtomNamespace/myAtom-["myParam"]-@scope("myScope")"
 */
export interface InternalAtomName extends BaseAtomName {
  /** Ex: "myAtomNamespace/myAtom" */
  atomName: string;

  /** Ex: ["myAtomNamespace", "myAtom"] */
  namespaces: string[];

  /** Ex: "myParam" */
  params: string | undefined;
}

export function parseAtomName(fullAtomName: string): AtomName;
export function parseAtomName(
  fullAtomName: string | undefined,
): AtomName | undefined;

export function parseAtomName(
  fullAtomName: string | undefined,
): AtomName | undefined {
  if (fullAtomName === undefined) {
    return undefined;
  }

  if (fullAtomName.startsWith('@@selector')) {
    const SELECTOR_REGEX = /^(?:@@selector-)?(.+?){1}?-(.+?)(?:-\[(.+)\])?$/;
    const match = SELECTOR_REGEX.exec(fullAtomName);
    if (match !== null) {
      const [, selectorName, selectorUid, params] = match as string[] as [
        string,
        string,
        string,
        string | undefined,
      ];
      const atomName = selectorName;
      const namespaces = atomName.split('/');
      return {
        type: 'selector',
        fullAtomName,
        params,
        selectorName,
        selectorUid,
        atomName,
        namespaces,
      };
    }
  }

  if (fullAtomName.startsWith('@signal')) {
    const SIGNAL_REGEX = /^@signal\((.+?){1}(?:-\[(.+?)\])??(?:\)-(.+?))??$/;
    const match = SIGNAL_REGEX.exec(fullAtomName);
    if (match !== null) {
      const [, atomName, params, signalUid] = match as string[] as [
        string,
        string,
        string,
        string,
        string | undefined,
        string,
      ];
      const namespaces = atomName.split('/');
      return {
        type: 'signal',
        fullAtomName,
        params,
        atomName,
        namespaces,
        signalUid,
      };
    }
  }

  if (fullAtomName.startsWith('no-')) {
    const LISTENER_REGEX = /^no-(.+)$/;
    const match = LISTENER_REGEX.exec(fullAtomName);
    if (match !== null) {
      const [, listenerUid] = match as string[] as [string, string];
      return {
        type: 'listener',
        fullAtomName,
        listenerUid,
      };
    }
  }

  const COMPONENT_REGEX = /^(.+)-:(.+):$/;
  const componentMatch = COMPONENT_REGEX.exec(fullAtomName);
  if (componentMatch !== null) {
    const [, componentName, componentUid] = componentMatch as string[] as [
      string,
      string,
      string,
    ];
    return {
      type: 'component',
      fullAtomName,
      componentName,
      componentUid,
    };
  }

  const NORMAL_REGEX = /^(.+?){1}(?:-\[(.+?)\])??(?:-@scope\((.+?)\))??$/;
  const match = NORMAL_REGEX.exec(fullAtomName);
  if (match !== null) {
    const [, atomName, params, scope] = match as string[] as [
      string,
      string,
      string,
      string,
      string | undefined,
      string | undefined,
    ];
    const namespaces = atomName.split('/');
    return {
      type: 'user',
      fullAtomName,
      atomName,
      namespaces,
      params,
      scope,
    };
  }

  return {
    type: 'user',
    fullAtomName,
    atomName: fullAtomName,
    namespaces: [fullAtomName],
    params: undefined,
    scope: undefined,
  };
}
