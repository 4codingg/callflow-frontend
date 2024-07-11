import * as Dropdown from "@radix-ui/react-select";
import { Paragraph } from "@/components/Paragraph";
import clsx from "clsx";
import { Check } from "phosphor-react";
import { ReactNode } from "react";

interface DropdownItemProps {
  label: ReactNode;
  leftIcon?: ReactNode;
  description?: string;
  value: string;
  className?: string;
}

export const DropdownItem = ({
  label,
  value,
  className,
  description,
  leftIcon,
  ...props
}: DropdownItemProps) => {
  return (
    <Dropdown.Item
      className="flex gap-2 items-center justify-between p-2 rounded-md hover:bg-light-grey cursor-pointer flex-row outline-none"
      {...props}
      value={value}
    >
      <Dropdown.ItemText>
        <div className="flex !flex-row items-center gap-2">
          {leftIcon}
          <Paragraph
            className={clsx("font-normal", {
              "!font-bold": !!description,
            })}
          >
            {label}
          </Paragraph>
        </div>
      </Dropdown.ItemText>
      <Dropdown.Label className="flex flex-col">
        <Paragraph>{description}</Paragraph>
      </Dropdown.Label>
      <Dropdown.ItemIndicator className="inline-flex right-2 absolute items-center justify-center">
        <Check size={16} />
      </Dropdown.ItemIndicator>
    </Dropdown.Item>
  );
};
