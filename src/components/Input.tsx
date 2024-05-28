import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";
import { Label, Paragraph, Spinner } from "@/components";
import Image from "next/image";

export enum InputVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
}

export enum InputPlaceholderVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  isOptional?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconSize?: number;
  variantPlaceholder?: InputPlaceholderVariant;
  labelStyle?: string;
  isLoading?: boolean;
  disableError?: boolean;
  labelDescription?: string;
}

export const Input = ({
  label,
  name,
  className,
  error,
  isOptional = false,
  disabled = false,
  variant = InputVariant.Default,
  iconLeft,
  iconRight,
  iconSize = 16,
  variantPlaceholder = InputPlaceholderVariant.Default,
  labelStyle,
  isLoading = false,
  disableError,
  labelDescription,
  ...props
}: InputProps) => {
  const inputClassesVariant = {
    [InputVariant.Default]:
      "border outline-none focus-within:outline focus-within:outline-primary text-black ",
    [InputVariant.Primary]:
      "!bg-neutral-light-grey placeholder:text-dark-grey rounded-lg text-neutral-darkest ",
    [InputVariant.Secondary]:
      "border !border-main-blue rounded-lg text-main-blue",
  };

  const inputPlaceholderClassesVariant = {
    [InputPlaceholderVariant.Default]:
      "placeholder:text-xs placeholder:default-grey",
    [InputPlaceholderVariant.Primary]: "placeholder:text-primary",
    [InputPlaceholderVariant.Secondary]: "placeholder:text-dark-grey",
  };

  return (
    <Label
      htmlFor={name}
      name={label}
      disabled={disabled}
      isOptional={isOptional}
      className="font-poppins font-semibold text-sm text-default-grey"
      labelStyle={clsx(labelStyle)}
    >
      {labelDescription && (
        <Paragraph className="text-xs text-default-grey">
          {labelDescription}
        </Paragraph>
      )}
      <div
        className={clsx(
          "bg-white rounded p-3 flex items-center text-main-blue ",
          inputClassesVariant[variant],
          {
            "!bg-medium-light-grey": disabled,
            "outline outline-negative-dark": error,
            "outline-neutral-grey": !error,
            "mt-3": !!label,
          },
          className
        )}
      >
        {iconLeft && <div className="mr-2">{iconLeft}</div>}
        <input
          id={name}
          disabled={disabled}
          className={clsx(
            "w-full outline-none font-normal text-sm font-poppins disabled:text-dark-grey rounded bg-transparent placeholder:font-normal",
            inputPlaceholderClassesVariant[variantPlaceholder]
          )}
          autoComplete="off"
          {...props}
        />

        {isLoading && (
          <Spinner
            className={clsx({
              "border-l-secondary border-t-secondary":
                variant === InputVariant.Primary,
            })}
          />
        )}

        {iconRight && <div className="ml-2">{iconRight}</div>}
      </div>

      {label && !disableError && (
        <Paragraph
          className={clsx({
            'before:content-["ok"] opacity-0 my-1': !error,
            " my-2 !font-normal !text-xs": error,
          })}
          hasError={!!error}
        >
          {error}
        </Paragraph>
      )}
    </Label>
  );
};
