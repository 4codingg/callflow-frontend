import Image from "next/image";
import Information from "@/assets/icons/information-circle.svg";
import { Heading, HeadingSizeVariant } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@chakra-ui/react";
import { LABELS_MASS_COMMUNICATION } from "@/constants/massCommunication";

export const MassCommunicationHeader = ({
  type,
  handleOpenModalInstructions,
}) => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col">
        <Heading size={HeadingSizeVariant.Large}>
          {LABELS_MASS_COMMUNICATION[type].header.title}
        </Heading>
        <Paragraph className="mt-2 font-normal !text-default-grey">
          {LABELS_MASS_COMMUNICATION[type].header.description}
        </Paragraph>
        <Button
          onClick={handleOpenModalInstructions}
          className="!bg-light-primary !w-[185px] !h-[48px] mt-[24px] flex items-center gap-2 !rounded-full"
        >
          <Image src={Information} alt="circle-information" />
          <Paragraph className=" text-xs text-purple-secundary !font-bold">
            Passo a Passo
          </Paragraph>
        </Button>
      </div>
    </header>
  );
};
