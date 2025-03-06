export function getReactComponentName(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>,
): string {
  if (Component.displayName !== undefined && Component.displayName.length > 0) {
    return Component.displayName;
  }
  if (Component.name.length > 0) {
    return Component.name;
  }
  return 'Component';
}
