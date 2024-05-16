import {
  Button,
  Card,
  Heading,
  HeadingSizeVariant,
  LayoutWithSidebar,
  Paragraph,
} from "@/components";
import { PLANS_ROWS } from "@/constants/plans";
import CheckImage from "@/assets/icons/Frame.png";

import Image from "next/image";
import { ModalConfirmPlan } from "@/components/layouts/Modals/ModalConfirmPlan";
import { useState } from "react";

export const PlansTemplate = () => {
  const [modalConfirmPlanIsOpen, setModalConfirmPlanIsOpen] = useState(false);
  return (
    <LayoutWithSidebar>
      <Card className="p-0 ">
        <header className="grid grid-cols-4 text-center h-[190px] ">
          <section className="col-span-1  pt-6 pl-6">
            <Heading className="!text-start">Planos</Heading>
            <Paragraph className=" !text-start mt-4 font-medium text-[#858BA0] text-xs max-w-[206px]">
              Escolha seu plano de acordo com seu planejamento de uso
            </Paragraph>
          </section>
          <section className="col-span-1 border-l pt-6 flex flex-col gap-4 justify-center items-center px-12">
            <Heading size={HeadingSizeVariant.ExtraLarge}>Grátis</Heading>
            <Button
              className="h-[51px] w-56  mx-auto"
              onClick={() => setModalConfirmPlanIsOpen(true)}
              type="button"
            >
              Escolher esse Plano
            </Button>
          </section>
          <section className="col-span-1 border-l pt-6 flex flex-col gap-4 justify-center items-center px-12">
            <Heading size={HeadingSizeVariant.ExtraLarge}>
              R$ 21,99
              <span className="text-[#858BA0] font-medium text-sm "> /mês</span>
            </Heading>
            <Button
              className="h-[51px] w-56 mx-auto"
              onClick={() => setModalConfirmPlanIsOpen(true)}
            >
              Escolher esse Plano
            </Button>
          </section>
          <section className="col-span-1 border-l pt-6 flex flex-col gap-4 justify-center items-center px-12">
            <Heading size={HeadingSizeVariant.ExtraLarge}>
              R$ 44,99
              <span className="text-[#858BA0] font-medium text-sm "> /mês</span>
            </Heading>
            <Button
              className="h-[51px] w-56 mx-auto"
              onClick={() => setModalConfirmPlanIsOpen(true)}
            >
              Escolher esse Plano
            </Button>
          </section>
        </header>
        <section className="flex flex-col">
          {PLANS_ROWS.map((row) => {
            return (
              <section
                className="grid grid-cols-4  text-center h-[80px] border-t  items-center"
                key={row.label}
              >
                <Paragraph className="!text-start flex pl-6 font-medium text-sm border-l h-full items-center">
                  {row.label}
                </Paragraph>
                <Paragraph className="flex justify-center font-medium text-sm border-l h-full items-center">
                  {row.values.free === true ? (
                    <Check />
                  ) : (
                    row.values.free ?? "-"
                  )}
                </Paragraph>
                <Paragraph className="flex justify-center font-medium text-sm border-l h-full items-center">
                  {row.values.plus === true ? (
                    <Check />
                  ) : (
                    row.values.plus ?? "-"
                  )}
                </Paragraph>
                <Paragraph className="flex justify-center font-medium text-sm border-l h-full items-center">
                  {row.values.premium === true ? (
                    <Check />
                  ) : (
                    row.values.premium ?? "-"
                  )}
                </Paragraph>
              </section>
            );
          })}
        </section>
        <ModalConfirmPlan
          modalIsOpen={modalConfirmPlanIsOpen}
          setModalIsOpen={setModalConfirmPlanIsOpen}
        />
      </Card>
    </LayoutWithSidebar>
  );
};

export const Check = () => {
  return (
    <Image className="mx-auto" alt="" src={CheckImage} width={20} height={20} />
  );
};
