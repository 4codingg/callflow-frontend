import clsx from "clsx";
import { Paragraph } from "./Paragraph";
import { ReactNode } from "react";

interface ITipboxProps {
  iconLeft?: any;
  children: string;
  buttonRight?: ReactNode;
  disabled?: boolean;
  className?: string;
  colorPalette?: "yellow";
}

export const Tipbox = ({
  iconLeft,
  children,
  buttonRight,
  className,
  colorPalette,
}: ITipboxProps) => {
  return (
    <div
      className={clsx(
        "bg-light-primary flex gap-4 !w-full justify-between items-center rounded-3xl px-6 py-3",
        className,
        {
          "!bg-[#c1bafd]": colorPalette === "yellow",
        }
      )}
    >
      <section className="flex gap-4 items-center">
        <div
          className={clsx("text-primary", {
            "text-[#2411d3]": colorPalette === "yellow",
          })}
        >
          {iconLeft}
        </div>
        <Paragraph
          className={clsx("text-primary", {
            "text-[#2411d3]": colorPalette === "yellow",
          })}
        >
          {" "}
          {children}{" "}
        </Paragraph>
      </section>
      {buttonRight}
    </div>
  );
};
