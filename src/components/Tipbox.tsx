import clsx from 'clsx';
import { Paragraph } from './Paragraph';
import { ReactNode } from 'react';

interface ITipboxProps {
  iconLeft?: any;
  children: string;
  buttonRight?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Tipbox = ({
  iconLeft,
  children,
  buttonRight,
  className,
}: ITipboxProps) => {
  return (
    <div
      className={clsx(
        'bg-light-primary flex gap-4 !w-full justify-between items-center rounded-3xl px-6 py-3',
        className
      )}
    >
      <section className="flex gap-4">
        <div className="text-primary">{iconLeft}</div>
        <Paragraph className=" text-primary "> {children} </Paragraph>
      </section>
      {buttonRight}
    </div>
  );
};
