export function isCircularObject(value: unknown): boolean {
  try {
    JSON.stringify(value);
    return false;
  } catch (error: unknown) {
    return error instanceof TypeError && error.message.includes('circular');
  }
}
