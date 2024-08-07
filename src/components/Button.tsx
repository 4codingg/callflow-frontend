import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  iconOnly = "icon-only",
}

export enum ButtonSizeVariant {
  Auto = "auto",
  Small = "small",
  Medium = "medium",
  Large = "full",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: any;
  rightIcon?: any;
  iconSize?: number;

  variant?: ButtonVariant;
  size?: ButtonSizeVariant;
}

export const Button = ({
  children,
  leftIcon,
  rightIcon,
  iconSize = 24,
  variant = ButtonVariant.Primary,
  size = ButtonSizeVariant.Auto,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClassesVariant = {
    [ButtonVariant.Primary]: "bg-primary disabled:bg-black-50 text-white",
    [ButtonVariant.Secondary]:
      "border-2 border-primary disabled:bg-black-50 text-primary",
    [ButtonVariant.iconOnly]: "disabled:opacity-40 !w-content py-0",
  };

  const buttonClassesSizes = {
    [ButtonSizeVariant.Small]: "py-4 px-10 max-h-[40px] ",
    [ButtonSizeVariant.Medium]: "py-6 px-4 h-[40px] w-[343px]",
    [ButtonSizeVariant.Large]: "py-6 px-4 h-[40px] w-full",
    [ButtonSizeVariant.Auto]: "w-full h-[40px] ",
  };

  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-full font-bold text-sm font-poppins gap-2 hover:opacity-90 active:opacity-80 disabled:opacity-100",
        buttonClassesSizes[size],
        buttonClassesVariant[variant],
        className,
        {
          "!bg-grey-80 hover:opacity-100 active:opacity-100": disabled,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {!disabled && leftIcon}

      {children}

      {!disabled && rightIcon}
    </button>
  );
};
