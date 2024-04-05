import { Root, CheckboxProps } from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { ReactNode } from "react";
import { Paragraph } from "./Paragraph";
import { Button } from "./Button";

interface ITipboxProps {
  iconLeft?: any;
  children: string;
  buttonRigth?: boolean;
  disabled?: boolean;
  className?: string;
}
export const Tipbox = ({
  iconLeft,
  children,
  buttonRigth,
  disabled,
  className,
}: ITipboxProps) => {
  return (
    <div className="flex items-center gap-5 !w-full">
      <Root className={clsx("w-full", className)} disabled={disabled}>
        <div className=" bg-light-primary flex !w-full justify-between items-center rounded-3xl px-6 py-3 mt-5 ">
          <section className="flex gap-4">
            <div className="text-primary">{iconLeft}</div>
            <Paragraph className=" text-primary "> {children} </Paragraph>
          </section>
          {buttonRigth == true && (
            <Button className=" !w-56 font-medium !text-sm">
              Fazer upgrade
            </Button>
          )}
        </div>
      </Root>
    </div>
  );
};
