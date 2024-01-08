import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalRootProps {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Root = ({ isOpen, setIsOpen, children }: ModalRootProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} modal>
      {children}
    </Dialog.Root>
  );
};

interface TriggerProps {
  children: ReactNode;
  className?: string;
}

export function Trigger({ children, className }: TriggerProps) {
  return (
    <Dialog.Trigger asChild className={className}>
      {children}
    </Dialog.Trigger>
  );
}

interface ModalContentProps extends Dialog.DialogPortalProps {
  children: ReactNode;
  className?: string;
}

export const Content = ({
  children,
  className,
  ...props
}: ModalContentProps) => {
  return (
    <Dialog.Portal {...props}>
      <Dialog.Overlay
        className={clsx(
          'bg-modal-background inset-0 fixed z-10 backdrop-blur-[1.5px] min-h-screen',
          className
        )}
      />

      <Dialog.Content
        asChild
        className={clsx(
          'overflow-auto fixed max-w-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg z-20 shadow',
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

interface ModalCloseProps {
  children: ReactNode;
  className?: string;
}

export const Close = ({ children, className }: ModalCloseProps) => {
  return (
    <Dialog.Close asChild className={className}>
      {children}
    </Dialog.Close>
  );
};

export const Modal = {
  Root,
  Close,
  Content,
  Trigger,
};
