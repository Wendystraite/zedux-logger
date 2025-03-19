import { ExternalNode } from '@zedux/react';

import type { WhatHappened } from '../parseWhatHappened/parseWhatHappened.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export function canLogEvent(args: {
  what: WhatHappened;
  options: CompleteZeduxLoggerOptions;
}): boolean {
  const {
    what: { node, tags, event },
    options: {
      disableLoggingTag,
      filters: { showExternalNodesChanges, showSignalsChanges },
      eventsToShow,
    },
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

  if (event?.type === undefined || !eventsToShow[event.type]) {
    return false;
  }

  return true;
}
