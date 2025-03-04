import { AtomInstance, ExternalNode } from '@zedux/react';

import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { SubscribedTo } from '../types/SubscribedTo.js';
import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function canLogEvent(args: {
  what: WhatHappened;
  options: ZeduxLoggerOptions;
  subscribedTo: SubscribedTo;
}): boolean {
  const {
    what: { node, flags, event, eventMap },
    options,
    subscribedTo,
  } = args;

  if (flags?.includes(options.disableLoggingFlag) === true) {
    return false;
  }

  if (options.hideExternalNodesChanges && node instanceof ExternalNode) {
    return false;
  }

  if (options.hideSignalsChanges && node?.id.startsWith('@signal') === true) {
    return false;
  }

  if (event?.type === undefined || !subscribedTo[event.type]) {
    return false;
  }

  if (
    subscribedTo.cycle &&
    subscribedTo.promiseChange &&
    eventMap.promiseChange?.source !== undefined &&
    eventMap.promiseChange.source instanceof AtomInstance &&
    eventMap.promiseChange.source._promiseStatus === 'loading'
  ) {
    return false;
  }

  return true;
}
