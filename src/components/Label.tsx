import clsx from 'clsx';
import { LabelHTMLAttributes } from 'react';
import { Paragraph, ParagraphSizeVariant } from '@/components';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  name?: string;
  disabled?: boolean;
  isOptional?: boolean;
  labelStyle?: string;
}

export const Label = ({
  children,
  name,
  className,
  isOptional = false,
  disabled = false,
  labelStyle,
  ...props
}: LabelProps) => {
  return (
    <label
      className={clsx('flex flex-col gap-4 w-full', className)}
      htmlFor={name}
      {...props}
    >
      {name && (
        <div className="flex items-center justify-between">
          <Paragraph
            size={ParagraphSizeVariant.Large}
            disabled={disabled}
            className={labelStyle}
          >
            {name}
          </Paragraph>

          {isOptional && (
            <Paragraph
              size={ParagraphSizeVariant.Small}
              disabled={disabled}
              className="italic"
            >
              (optional)
            </Paragraph>
          )}
        </div>
      )}
      {children}
    </label>
  );
};
