import clsx from 'clsx';
import { ReactNode } from 'react';

export interface ICardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: ICardProps) => {
  return (
    <div
      className={clsx(
        'bg-white border border-muted shadow-md rounded-lg p-6',
        className
      )}
    >
      {children}
    </div>
  );
};
