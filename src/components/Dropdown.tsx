import React, { ChangeEvent } from "react";
import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";
import Image from "next/image";
import { DropdownItem } from "./DropdownItem";
import clsx from "clsx";
import { Label } from "./Label";
import { Spinner } from "./Spinner";
import { Paragraph } from "./Paragraph";

export enum DropdownVariant {
  Default = "default",
}

export interface ISelectOptionProps {
  value: string;
  label: string;
  description?: string;
}

interface DropdownProps {
  label?: string;
  error?: string;
  variant?: DropdownVariant;
  isOptional?: boolean;
  className?: string;
  value?: ISelectOptionProps["value"];
  selectStyle?: string;
  onValueChange?: (e: string | ChangeEvent<any>) => void;
  options: ISelectOptionProps[] | string[];
  placeholder?: string;
  disabled?: boolean;
  labelStyle?: string;
  isLoading?: boolean;
  defaultValue?: string;
  labelDescription?: string;
}

export const Dropdown = ({
  defaultValue,
  value,
  onValueChange,
  selectStyle = "",
  options,
  error,
  variant = DropdownVariant.Default,
  label,
  placeholder = "Select",
  disabled = false,
  className,
  labelStyle,
  labelDescription,
  isLoading = false,
}: DropdownProps) => {
  const dropdownClassesVariant = {
    [DropdownVariant.Default]:
      "border outline-none focus-within:border-primary",
  };

  return (
    <Label name={label} disabled={disabled} labelStyle={labelStyle}>
      {labelDescription && (
        <Paragraph className="text-xs text-default-grey">
          {labelDescription}
        </Paragraph>
      )}

      <Select.Root
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
      >
        <Select.Trigger
          className={clsx(
            "p-3 text-sm font-poppins text-neutral-darkest disabled:text-dark-grey h-[40px] mt-3 disabled:bg-neutral-light-grey font w-full flex justify-between items-center rounded data-[placeholder]:text-neutral-darkest",
            dropdownClassesVariant[variant],
            selectStyle,
            className
          )}
          aria-label={label}
        >
          <Select.Value placeholder={placeholder} className="font-normal" />
          <Select.Icon>
            <CaretDown size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            className="bg-white p-2 flex flex-row border border-neutral-grey rounded min-w-[200px] max-h-[300px] !z-[1000001]"
          >
            <Select.Viewport
              className="text-neutral-darkest font-poppins"
              defaultValue={"United States"}
            >
              <Select.Group>
                {isLoading && (
                  <div className="flex flex-1 justify-between items-center ">
                    <Spinner />
                  </div>
                )}

                {options.map((option) => (
                  <DropdownItem
                    description={
                      typeof option === "string" ? "" : option?.description
                    }
                    key={typeof option === "string" ? option : option?.value}
                    label={typeof option === "string" ? option : option?.label}
                    value={typeof option === "string" ? option : option?.value}
                  />
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {label && error && (
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
