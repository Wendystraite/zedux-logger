import { Button, type ButtonProps } from './Button';

type IconButtonProps = ButtonProps;

export function IconButton({
  onClick,
  children,
  className = '',
}: IconButtonProps) {
  return (
    <Button
      className={`bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
