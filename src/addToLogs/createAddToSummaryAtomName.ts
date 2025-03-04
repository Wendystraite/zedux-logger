import { ZEDUX_LOGGER_COLORS } from '../colors.js';
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
    const { addLogToSummary } = args;

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
              ? ZEDUX_LOGGER_COLORS.atomNameLastNamespace
              : ZEDUX_LOGGER_COLORS.atomNameNamespace,
            ZEDUX_LOGGER_COLORS.default,
          ])
          .flat();

        addLogToSummary(
          `${namespacesStr}%c${paramsStr}%c${scopeStr}`,
          ...namespacesColors,
          ZEDUX_LOGGER_COLORS.atomNameParams,
          ZEDUX_LOGGER_COLORS.atomNameScope,
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
              ? ZEDUX_LOGGER_COLORS.atomNameLastNamespace
              : ZEDUX_LOGGER_COLORS.atomNameNamespace,
            ZEDUX_LOGGER_COLORS.default,
          ])
          .flat();

        addLogToSummary(
          `signal(${namespacesStr}%c${paramsStr}%c-%c${signalUid}%c)`,
          ...namespacesColors,
          ZEDUX_LOGGER_COLORS.atomNameParams,
          ZEDUX_LOGGER_COLORS.default,
          ZEDUX_LOGGER_COLORS.atomNameSignalUid,
          ZEDUX_LOGGER_COLORS.default,
        );

        break;
      }
      case 'selector': {
        const { selectorName, selectorUid, params } = atomName;
        const paramsStr = params !== undefined ? `[${params}]` : '';

        addLogToSummary(
          `selector(%c${selectorName}%c${paramsStr}%c-%c${selectorUid}%c)`,
          ZEDUX_LOGGER_COLORS.atomNameSelectorName,
          ZEDUX_LOGGER_COLORS.atomNameParams,
          ZEDUX_LOGGER_COLORS.default,
          ZEDUX_LOGGER_COLORS.atomNameSelectorUid,
          ZEDUX_LOGGER_COLORS.default,
        );

        break;
      }
      case 'listener': {
        const { listenerUid } = atomName;

        addLogToSummary(
          `listener(%c${listenerUid}%c)`,
          ZEDUX_LOGGER_COLORS.atomNameListenerUid,
          ZEDUX_LOGGER_COLORS.default,
        );

        break;
      }
      case 'component':
      default: {
        const { componentName, componentUid } = atomName;

        addLogToSummary(
          `rc(%c${componentName}%c-${componentUid})`,
          ZEDUX_LOGGER_COLORS.atomNameReactComponentName,
          ZEDUX_LOGGER_COLORS.default,
        );

        break;
      }
    }
  };
}
