import type { ParsedNodeId } from '../parseAtomId/parseNodeId.js';
import type { CompleteZeduxLoggerColors } from '../types/ZeduxLoggerColors.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

function getNodeIdNamespaces(
  nodeId: string,
  colors: Pick<
    CompleteZeduxLoggerColors,
    'atomNameLastNamespace' | 'atomNameNamespace' | 'default'
  >,
) {
  const namespaces = nodeId.split('/');
  const namespacesStr = namespaces.map((ns) => `%c${ns}%c`).join('/');
  const namespacesColors = namespaces
    .map((_ns, idx) => [
      idx >= namespaces.length - 1
        ? colors.atomNameLastNamespace
        : colors.atomNameNamespace,
      colors.default,
    ])
    .flat();

  return { namespacesStr, namespacesColors };
}

export function addToSummaryAnyNodeId(args: {
  nodeId: string | undefined;
  nodeIdParsed: ParsedNodeId | undefined;
  logArgs: ZeduxLoggerLogArgs;
}): void {
  const {
    nodeId,
    nodeIdParsed,
    logArgs: {
      addLogToSummary,
      options: { colors },
    },
  } = args;

  if (nodeIdParsed !== undefined) {
    if (nodeIdParsed.type === '@atom') {
      const { name, params, scope } = nodeIdParsed;

      const { namespacesStr, namespacesColors } = getNodeIdNamespaces(
        name,
        colors,
      );

      const paramsStr = params !== undefined ? ` [${params}]` : '';

      const scopeStr = scope !== undefined ? ` @scope(${scope})` : '';

      addLogToSummary(
        `${namespacesStr}%c${paramsStr}%c${scopeStr}%c`,
        ...namespacesColors,
        colors.atomNameParams,
        colors.atomNameScope,
        colors.default,
      );
    } else {
      const { type, wrapped, suffix, subNode } = nodeIdParsed;

      const wrappedColor = {
        '@signal': colors.default,
        '@selector': colors.atomNameSelectorName,
        '@listener': colors.default,
        '@component': colors.atomNameReactComponentName,
        '@memo': colors.default,
        '@scope': colors.atomNameScope,
        '@atom': colors.default,
      }[type];

      const suffixColor = {
        '@signal': colors.atomNameSignalUid,
        '@selector': colors.default,
        '@listener': colors.atomNameListenerUid,
        '@component': colors.default,
        '@memo': colors.default,
        '@scope': colors.default,
        '@atom': colors.default,
      }[type];

      if (subNode !== undefined && subNode.type === '@atom') {
        const {
          namespacesStr: subNodeNamespacesStr,
          namespacesColors: subNodeNamespacesColors,
        } = getNodeIdNamespaces(subNode.name, colors);

        const subNodeParamsStr =
          subNode.params !== undefined ? `[${subNode.params}]` : '';

        const subNodeScopeStr =
          subNode.scope !== undefined ? `@scope(${subNode.scope})` : '';

        addLogToSummary(
          `%c${type}(${subNodeNamespacesStr}%c${subNodeParamsStr}%c${subNodeScopeStr}%c)${suffix ? `-%c${suffix}` : '%c'}%c`,
          colors.default,
          ...subNodeNamespacesColors,
          colors.atomNameParams,
          colors.atomNameScope,
          colors.default,
          suffixColor,
          colors.default,
        );
      } else {
        addLogToSummary(
          `%c${type}(%c${wrapped}%c)${suffix ? `-%c${suffix}` : '%c'}%c`,
          colors.default,
          wrappedColor,
          colors.default,
          suffixColor,
          colors.default,
        );
      }
    }
  } else if (nodeId !== undefined) {
    addLogToSummary(nodeId);
    return;
  }
}
