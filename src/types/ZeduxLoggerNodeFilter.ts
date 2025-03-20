import type * as Zedux from '@zedux/react';

export type ZeduxLoggerNodeFilter =
  /** Node's name */
  | string
  | RegExp
  /** Node's type */
  | { type: Zedux.NodeType }
  /** Template */
  | Zedux.AnyAtomTemplate
  /** Selector */
  | Zedux.SelectorTemplate
  /** Tag */
  | { tag: string | RegExp };
