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
import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "@/api/subscriptions/fetch-subscriptionts";
import { ISubscription } from "@/@types/Subscription";
import { useCompany } from "@/hooks/useCompany";
import { CheckCircle } from "phosphor-react";

export const PlansTemplate = () => {
  const [modalConfirmPlanIsOpen, setModalConfirmPlanIsOpen] = useState(false);
  const [planToConfirm, setPlanToConfirm] = useState({} as ISubscription);
  const { plan: currentCompanyPlan } = useCompany();

  const { data: plans } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => fetchSubscriptions(),
  });

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

          {plans?.map((plan) => {
            const isActive = plan.id === currentCompanyPlan;

            return (
              <section
                className="col-span-1 border-l pt-6 flex flex-col gap-4 justify-center items-center px-12"
                key={plan.id}
              >
                <Heading size={HeadingSizeVariant.ExtraLarge}>
                  R$ {plan.value}
                  <span className="text-[#858BA0] font-medium text-sm ">
                    {" "}
                    /mês
                  </span>
                </Heading>
                <Button
                  className="h-[51px] w-56 mx-auto"
                  onClick={() => {
                    setModalConfirmPlanIsOpen(true);
                    setPlanToConfirm(plan);
                  }}
                  disabled={isActive}
                >
                  {isActive ? (
                    <CheckCircle color="#FFF" size={16} />
                  ) : (
                    "Escolher esse Plano"
                  )}
                </Button>
              </section>
            );
          })}
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
          planToConfirm={planToConfirm}
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
