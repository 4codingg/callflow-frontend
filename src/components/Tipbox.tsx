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
    <div className={clsx('flex items-center gap-5 !w-full', className)}>
      <div className=" bg-light-primary flex !w-full justify-between items-center rounded-3xl px-6 py-3 mt-5 ">
        <section className="flex gap-4">
          <div className="text-primary">{iconLeft}</div>
          <Paragraph className=" text-primary "> {children} </Paragraph>
        </section>
        {buttonRight}
      </div>
    </div>
  );
};
