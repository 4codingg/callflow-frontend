import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface IDropdownMenuRootProps {
  children: ReactNode;
  className?: string;
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
        // {...props}
        className={clsx(' bg-white shadow-lg rounded-lg', className)}
        side="bottom"
        align="end"
        // className={clsx(
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
    <DropdownMenuPrimitive.Trigger className={clsx('', className)}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
};

export const DropdownMenu = {
  Root,
  Content,
  Trigger,
};
