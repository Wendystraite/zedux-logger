import type { EcosystemEvents } from '@zedux/react';

export type SubscribedTo = Record<
  EcosystemEvents[keyof EcosystemEvents]['type'],
  boolean
>;
