import clsx from 'clsx';
import { ReactNode } from 'react';

interface ICardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: ICardProps) => {
  return (
    <div className={clsx('bg-white rounded-2xl p-6', className)}>
      {children}
    </div>
  );
};
