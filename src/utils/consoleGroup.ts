export function consoleGroup(
  console: Console,
  type: 'group' | 'groupCollapsed',
  label: string | string[],
  callback: () => void,
) {
  try {
    console[type](...(typeof label === 'string' ? [label] : label));
    callback();
  } finally {
    console.groupEnd();
  }
}
