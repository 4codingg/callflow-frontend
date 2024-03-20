import clsx from "clsx";
import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { Label, Paragraph, Spinner } from "@/components";
import Image from "next/image";

export enum TextAreaVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
}

export enum TextAreaPlaceholderVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: TextAreaVariant;
  isOptional?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconSize?: number;
  variantPlaceholder?: TextAreaPlaceholderVariant;
  labelStyle?: string;
  isLoading?: boolean;
}

export const TextArea = ({
  label,
  name,
  className,
  error,
  isOptional = false,
  disabled = false,
  variant = TextAreaVariant.Default,
  iconLeft,
  iconRight,
  iconSize = 16,
  variantPlaceholder = TextAreaPlaceholderVariant.Default,
  labelStyle,
  isLoading = false,
  ...props
}: TextAreaProps) => {
  const textAreaClassesVariant = {
    [TextAreaVariant.Default]:
      "border outline-none focus-within:border-primary text-neutral-darkest ",
    [TextAreaVariant.Primary]:
      "!bg-neutral-light-grey placeholder:text-dark-grey rounded-lg text-neutral-darkest ",
    [TextAreaVariant.Secondary]:
      "border !border-main-blue rounded-lg text-main-blue",
  };

  const textAreaPlaceholderClassesVariant = {
    [TextAreaPlaceholderVariant.Default]: "",
    [TextAreaPlaceholderVariant.Primary]: "placeholder:text-primary",
    [TextAreaPlaceholderVariant.Secondary]: "placeholder:text-dark-grey",
  };

  return (
    <Label
      htmlFor={name}
      name={label}
      disabled={disabled}
      isOptional={isOptional}
      className="font-poppins flex flex-col gap-3"
      labelStyle={clsx(labelStyle)}
    >
      <div
        className={clsx(
          "bg-white rounded p-3 flex items-center text-main-blue",
          textAreaClassesVariant[variant],
          {
            "!bg-neutral-light-grey": disabled,
            "border-negative-dark border-opacity-100": error,
            "border-neutral-grey": !error,
          }
        )}
      >
        {iconLeft && <div className="mr-2">{iconLeft}</div>}
        <textarea
          id={name}
          disabled={disabled}
          className={clsx(
            "resize-none w-full outline-none text-sm font-poppins disabled:text-dark-grey rounded bg-transparent h-[150px] p2",
            textAreaPlaceholderClassesVariant[variantPlaceholder],
            className
          )}
          autoComplete="off"
          {...props}
        />

        {isLoading && (
          <Spinner
            className={clsx({
              "border-l-secondary border-t-secondary":
                variant === TextAreaVariant.Primary,
            })}
          />
        )}

        {iconRight && <div className="ml-2">{iconRight}</div>}
      </div>

      {label && (
        <Paragraph
          className={clsx({
            'before:content-["ok"] opacity-0': !error,
          })}
          hasError={!!error}
        >
          {error}
        </Paragraph>
      )}
    </Label>
  );
};
