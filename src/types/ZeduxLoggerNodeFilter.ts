import type { AnyAtomTemplate, NodeType, SelectorTemplate } from '@zedux/react';

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

export type ZeduxLoggerNodeFilter =
  /** Node's id (weakly match) */
  | string
  | { idMatch: string | RegExp | Array<string | RegExp> }
  /** Node's id (strictly match) */
  | { idEqual: string | string[] }
  /** Node's type */
  | NodeType
  | { type: NodeType | NodeType[] }
  /** Template / Selector */
  | {
      template:
        | AnyAtomTemplate
        | SelectorTemplate
        | Array<AnyAtomTemplate | SelectorTemplate>;
    }
  /** Tag */
  | { tag: string | RegExp | Array<string | RegExp> };
