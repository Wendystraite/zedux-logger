import { type ElementType } from 'react';

interface SkeletonProps {
  className?: string;
  as?: ElementType<{ className: string }>;
}

export function Skeleton({
  className = '',
  as: As = 'div',
  ...props
}: SkeletonProps) {
  return (
    <As
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
}
