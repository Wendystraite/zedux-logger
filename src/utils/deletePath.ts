export function deletePath(obj: object, path: string[]): void {
  if (path.length === 0) return;

  const lastKey = path.pop();
  let parent: object = obj;
  for (const key of path) {
    if (!Object.hasOwn(parent, key)) {
      return;
    }
    const child = parent[key as keyof typeof parent] as unknown;
    if (child === null || typeof child !== 'object') {
      return;
    }
    parent = child;
  }

  if (lastKey !== undefined && lastKey in parent) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete parent[lastKey as keyof typeof parent];
  }
}
