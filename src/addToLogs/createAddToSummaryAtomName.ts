import type { AtomName } from '../parseAtomName/parseAtomName.js';
import type { LogArgs } from './LogArgs.js';

export function createAddToSummaryAtomName({
  show = true,
  atomName,
}: {
  show?: boolean;
  atomName: AtomName | undefined;
}) {
  return function addToSummaryAtomName(args: LogArgs): void {
    const {
      addLogToSummary,
      options: { colors },
    } = args;

    if (!show || atomName === undefined) {
      return;
    }

    switch (atomName.type) {
      case 'user': {
        const { namespaces, params, scope } = atomName;
        const paramsStr = params !== undefined ? `[${params}]` : '';
        const scopeStr = scope !== undefined ? `@scope(${scope})` : '';
        const namespacesStr = namespaces.map((ns) => `%c${ns}%c`).join('/');
        const namespacesColors = namespaces
          .map((_ns, idx) => [
            idx >= namespaces.length - 1
              ? colors.atomNameLastNamespace
              : colors.atomNameNamespace,
            colors.default,
          ])
          .flat();

        addLogToSummary(
          `${namespacesStr}%c${paramsStr}%c${scopeStr}`,
          ...namespacesColors,
          colors.atomNameParams,
          colors.atomNameScope,
        );

        break;
      }
      case 'signal': {
        const { namespaces, params, signalUid } = atomName;
        const paramsStr = params !== undefined ? `[${params}]` : '';
        const namespacesStr = namespaces.map((ns) => `%c${ns}%c`).join('/');
        const namespacesColors = namespaces
          .map((_ns, idx) => [
            idx >= namespaces.length - 1
              ? colors.atomNameLastNamespace
              : colors.atomNameNamespace,
            colors.default,
          ])
          .flat();

        addLogToSummary(
          `signal(${namespacesStr}%c${paramsStr}%c-%c${signalUid}%c)`,
          ...namespacesColors,
          colors.atomNameParams,
          colors.default,
          colors.atomNameSignalUid,
          colors.default,
        );

        break;
      }
      case 'selector': {
        const { selectorName, selectorUid, params } = atomName;
        const paramsStr = params !== undefined ? `[${params}]` : '';

        addLogToSummary(
          `selector(%c${selectorName}%c${paramsStr}%c-%c${selectorUid}%c)`,
          colors.atomNameSelectorName,
          colors.atomNameParams,
          colors.default,
          colors.atomNameSelectorUid,
          colors.default,
        );

        break;
      }
      case 'listener': {
        const { listenerUid } = atomName;

        addLogToSummary(
          `listener(%c${listenerUid}%c)`,
          colors.atomNameListenerUid,
          colors.default,
        );

        break;
      }
      case 'component':
      default: {
        const { componentName, componentUid } = atomName;

        addLogToSummary(
          `rc(%c${componentName}%c-${componentUid})`,
          colors.atomNameReactComponentName,
          colors.default,
        );

        break;
      }
    }
  };
}
