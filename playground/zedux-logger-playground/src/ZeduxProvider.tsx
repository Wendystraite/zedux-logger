import {
  addBasicZeduxLogger,
  addZeduxLogger,
} from '@wendystraite/zedux-logger';
import { EcosystemProvider, createEcosystem } from '@zedux/react';
import { type PropsWithChildren, useMemo } from 'react';

export function ZeduxProvider({ children }: PropsWithChildren) {
  const ecosystem = useMemo(() => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem);
    if (localStorage.getItem('DEBUG')) {
      addBasicZeduxLogger(ecosystem); // For debugging
    }
    return ecosystem;
  }, []);
  return (
    <EcosystemProvider ecosystem={ecosystem}>{children}</EcosystemProvider>
  );
}
