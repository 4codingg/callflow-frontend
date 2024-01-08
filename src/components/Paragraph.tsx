import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

export enum ParagraphSizeVariant {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra-large',
}

interface ParagraphProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  size?: ParagraphSizeVariant;
  disabled?: boolean;
  hasError?: boolean;
}

export const Paragraph = ({
  children,
  className,
  size = ParagraphSizeVariant.Medium,
  disabled = false,
  hasError = false,
  ...props
}: ParagraphProps) => {
  const ParagraphClassesSize = {
    [ParagraphSizeVariant.Small]: 'text-xs',
    [ParagraphSizeVariant.Medium]: 'text-sm',
    [ParagraphSizeVariant.Large]: 'text-base',
    [ParagraphSizeVariant.ExtraLarge]: 'text-xl',
  };

  return (
    <p
      className={clsx(
        'font-poppins',
        ParagraphClassesSize[size],
        {
          'text-dark-primary': !disabled && !hasError,
          'text-dark-grey': disabled,
          'text-negative-dark': hasError,
        },
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
