import type {
  AnyNodeGenerics,
  EcosystemEvents,
  ListenableEvents,
} from '@zedux/react';

export type EventMap = Partial<
  ListenableEvents<AnyNodeGenerics<{ Events: EcosystemEvents }>>
>;
