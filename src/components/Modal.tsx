import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  Modal as ModalRoot,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalCloseButtonProps,
} from '@chakra-ui/modal';

interface IModalRootProps {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  trapFocus?: boolean;
}

export const Root = ({
  isOpen,
  setIsOpen,
  children,
  trapFocus = true,
}: IModalRootProps) => {
  return (
    <ModalRoot
      trapFocus={trapFocus}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {children}
    </ModalRoot>
  );
};

interface IModalContentProps extends Dialog.DialogContentProps {
  children: ReactNode;
  className?: string;
}

export const Content = ({
  children,
  className,
  ...props
}: IModalContentProps) => {
  return (
    <>
      <ModalOverlay
        className={clsx('bg-modal-background  backdrop-blur-[1.5px]  ')}
      />

      <ModalContent asChild className={clsx(className)} {...props}>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </>
  );
};

interface ModalCloseProps extends ModalCloseButtonProps {
  children: ReactNode;
  className?: string;
}

export const Close = ({ children, className }: ModalCloseProps) => {
  return <ModalCloseButton className={className}>{children}</ModalCloseButton>;
};

export const Modal = {
  Root,
  Close,
  Content,
};
