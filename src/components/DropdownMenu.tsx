import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface IDropdownMenuRootProps {
  children: ReactNode;
}

const Root = ({ children }: IDropdownMenuRootProps) => {
  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>;
};

interface IDropdownMenuContentProps
  extends DropdownMenuPrimitive.DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

const Content = ({
  children,
  className,
  ...props
}: IDropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        // asChild
        {...props}
        className="min-w-[230px] bg-white p-6 absolute right-0 shadow-lg rounded-lg"
        alignOffset={100}
        // className={clsx(
        //   'w-[260px] rounded-lg p-2 bg-white border-2 border-primary shadow-sm transition-all duration-300 ease-in-out',
        //   className
        // )}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

interface IDropdownMenuTriggerProps {
  children: ReactNode;
  className?: string;
}

const Trigger = ({ children, className }: IDropdownMenuTriggerProps) => {
  return (
    <DropdownMenuPrimitive.Trigger className={clsx('', className)} asChild>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
};

export const DropdownMenu = {
  Root,
  Content,
  Trigger,
};
