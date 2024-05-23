import Image from "next/image";
import { PlusCircle } from "phosphor-react";
import { Button } from "./Button";
import { Paragraph } from "./Paragraph";
import { Heading, HeadingSizeVariant, HeadingVariant } from "./Heading";

interface EmptyProps {
  icon?: any;
  title?: string;
  description?: string;
  actionButton?: any;
  textButton?: string;
}
export const EmptyState = ({
  icon,
  title,
  description,
  actionButton,
  textButton,
}: EmptyProps) => {
  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col items-center gap-1 w-54">
        <Image src={icon} alt="icon-lista-vazia" />
        <Heading size={HeadingSizeVariant.Small}>{title}</Heading>
        <Paragraph className=" font-normal text-center max-w-[240px]">
          {" "}
          {description}
        </Paragraph>
        {textButton && (
          <Button
            className="font-light mt-6 w-[!149] px-2"
            leftIcon={<PlusCircle size={20} color="#FFF" />}
            onClick={actionButton}
          >
            {textButton}
          </Button>
        )}
      </section>
    </div>
  );
};
