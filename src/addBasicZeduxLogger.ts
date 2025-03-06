import type { Ecosystem } from '@zedux/react';
import { entries, find, isNonNullish, pipe, when } from 'remeda';

/**
 * A very basic logger for Zedux that log everything happening in an ecosystem.
 *
 * @param ecosystem ecosystem to attach the logger to
 * @param basicOptions.console console-like object to log to
 *
 * @remarks
 * This logger is used for benchmarking and debugging purposes.
 * Use {@link addZeduxLogger} for a more complete logger.
 *
 * @example
 * const ecosystem = createEcosystem();
 * addBasicZeduxLogger(ecosystem);
 */
export function addBasicZeduxLogger(
  ecosystem: Ecosystem,
  basicOptions?: { console: Pick<Console, 'log'> },
): void {
  const { console: consoleLike = console } = basicOptions ?? {};

  ecosystem.on((eventMap) => {
    const { type, event } = pipe(
      eventMap,
      entries(),
      find(([, event]) => isNonNullish(event)),
      when((event) => isNonNullish(event), {
        onTrue: ([type, event]) => ({ type, event }),
        onFalse: () => ({ type: 'unknown' as const, event: undefined }),
      }),
    );
    consoleLike.log(type, event);
  });
}
