import {
  addBasicZeduxLogger,
  addZeduxLogger,
} from '@wendystraite/zedux-logger';
import { EcosystemProvider, createEcosystem } from '@zedux/react';
import { type PropsWithChildren, useMemo } from 'react';

import { addSomeFakeAtoms } from './addSomeFakeAtoms';

export function ZeduxProvider({ children }: PropsWithChildren) {
  const ecosystem = useMemo(() => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem, {
      options: {
        graphOptions: {
          showExternalNodesInFlatGraph: true,
          showSignalsInFlatGraph: true,
        },
      },
    });

    if (localStorage.getItem('DEBUG')) {
      addBasicZeduxLogger(ecosystem); // For debugging
    }

    addSomeFakeAtoms(ecosystem);

    return ecosystem;
  }, []);
  return (
    <EcosystemProvider ecosystem={ecosystem}>{children}</EcosystemProvider>
  );
}
