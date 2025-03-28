import type { ReactNode } from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function Button({ onClick, children, className = '' }: ButtonProps) {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-500 text-white py-1 px-2 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
