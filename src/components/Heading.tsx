import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export enum HeadingAsVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export enum HeadingSizeVariant {
  ExtraSmall = 'extra-small',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra-large',
}

export enum HeadingVariant {
  DarkPrimary = 'dark-primary',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  size?: HeadingSizeVariant;
  as?: HeadingAsVariant;
  variant?: HeadingVariant;
  className?: string;
}

export const Heading = ({
  children,
  size = HeadingSizeVariant.Medium,
  as = HeadingAsVariant.H1,
  variant = HeadingVariant.DarkPrimary,
  className,
  ...props
}: HeadingProps) => {
  const Component = as;

  const headingClassesSize = {
    [HeadingSizeVariant.ExtraSmall]: 'text-sm',
    [HeadingSizeVariant.Small]: 'text-base',
    [HeadingSizeVariant.Medium]: 'text-2xl',
    [HeadingSizeVariant.Large]: 'text-3xl',
    [HeadingSizeVariant.ExtraLarge]: 'text-4xl',
  };

  const headingClassesVariant = {
    [HeadingVariant.DarkPrimary]: 'text-dark-primary',
    [HeadingVariant.Primary]: 'text-primary',
    [HeadingVariant.Secondary]: 'text-main-blue',
    [HeadingVariant.Tertiary]: 'text-white',
  };

  return (
    <Component
      className={clsx(
        'font-poppins font-bold',
        headingClassesSize[size],
        headingClassesVariant[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
