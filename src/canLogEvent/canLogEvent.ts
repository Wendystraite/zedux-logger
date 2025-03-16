import { ExternalNode } from '@zedux/react';

import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { SubscribedTo } from '../types/SubscribedTo.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function canLogEvent(args: {
  what: WhatHappened;
  options: CompleteZeduxLoggerOptions;
  subscribedTo: SubscribedTo;
}): boolean {
  const {
    what: { node, tags, event },
    options: {
      disableLoggingTag,
      filters: { showExternalNodesChanges, showSignalsChanges },
    },
    subscribedTo,
  } = args;

  if (
    disableLoggingTag !== null &&
    tags?.includes(disableLoggingTag) === true
  ) {
    return false;
  }

  if (!showExternalNodesChanges && node instanceof ExternalNode) {
    return false;
  }

  if (!showSignalsChanges && node?.id.startsWith('@signal') === true) {
    return false;
  }

  if (event?.type === undefined || !subscribedTo[event.type]) {
    return false;
  }

  return true;
}
