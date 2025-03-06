import { type ComponentType, Suspense } from 'react';

import { Skeleton } from '../ui/Skeleton';
import { getReactComponentName } from './getReactComponentName';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export default function withSuspense<PROPS extends object = {}>(
  WrappedComponent: ComponentType<PROPS>,
  fallback = <Skeleton className="w-full h-full min-w-8 min-h-8" />,
): ComponentType<PROPS> {
  function WithSuspense(props: PROPS) {
    return (
      <Suspense fallback={fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }
  WithSuspense.displayName = `WithSuspense(${getReactComponentName(WrappedComponent)})`;
  return WithSuspense;
}
