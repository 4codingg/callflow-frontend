import { CheckCircle } from "phosphor-react";
import { Paragraph } from "./Paragraph";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ReactNode } from "react";

interface IAccordionCardProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const AccordionCard = ({
  children,
  title,
  description,
}: IAccordionCardProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-white border border-muted shadow-md rounded-lg px-6 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="!border-none relative">
          <div className="flex items-center justify-start w-full">
            <div className="flex flex-col items-start">
              <Paragraph className="!text-base !font-bold">{title}</Paragraph>
              <Paragraph className="!text-xs text-default-grey">
                {description}
              </Paragraph>
            </div>
            {/* <CheckCircle color="#00DEA3" size={24} className="ml-auto flex" /> */}
          </div>
        </AccordionTrigger>
        <AccordionContent className="gap-4 flex flex-col px-1">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
