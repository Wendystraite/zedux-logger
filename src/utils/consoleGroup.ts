export function consoleGroup(
  console: Pick<Console, 'group' | 'groupCollapsed' | 'groupEnd'>,
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
