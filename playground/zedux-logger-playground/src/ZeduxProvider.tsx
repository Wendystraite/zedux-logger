import { EcosystemProvider, createEcosystem } from '@zedux/react';
import { type PropsWithChildren, useMemo } from 'react';

import { addZeduxLogger } from '../../../dist';

export function ZeduxProvider({ children }: PropsWithChildren) {
  const ecosystem = useMemo(() => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem);
    return ecosystem;
  }, []);
  return (
    <EcosystemProvider ecosystem={ecosystem}>{children}</EcosystemProvider>
  );
}
