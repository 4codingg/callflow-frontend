import * as Dropdown from "@radix-ui/react-select";
import Image from "next/image";
import { Paragraph } from "@/components/Paragraph";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface DropdownItemProps {
  label: string;
  description?: string;
  value: string;
  className?: string;
}

export const DropdownItem = ({
  label,
  value,
  className,
  description,
  ...props
}: DropdownItemProps) => {
  return (
    <Dropdown.Item
      className="flex-col hover:underline cursor-pointer rounded px-1 py-1  outline-none flex justify-center"
      {...props}
      value={value}
    >
      <Dropdown.ItemText className="">
        <Paragraph
          className={clsx("font-normal", {
            "!font-bold": !!description,
          })}
        >
          {label}
        </Paragraph>
      </Dropdown.ItemText>
      <Dropdown.Label className="flex flex-col">
        <Paragraph>{description}</Paragraph>
      </Dropdown.Label>
      <Dropdown.ItemIndicator className="inline-flex right-0 absolute items-center justify-center">
        <Check size={16} />
      </Dropdown.ItemIndicator>
    </Dropdown.Item>
  );
};
