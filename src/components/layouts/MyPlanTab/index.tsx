import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Line } from "@/components/Line";
import { Paragraph } from "@/components/Paragraph";
import { INVOICES_MOCK } from "@/constants/invoices";
import { TableInvoicesPayments } from "../Tables/TableInvoicesPayments";
import { ModalConfirmCancelPlan } from "../Modals/ModalConfirmCancelPlan";
import { useCompany } from "@/hooks/useCompany";
import "react-credit-cards/es/styles-compiled.css";
import { formatDateToDDMMYYYYHHMM } from "@/utils/formatDateToDDMMYYYYHHMM";
import { IPlanSubscriptionValue } from "@/@types/Subscription";

export const MyPlanTab = () => {
  const [subscriptionIsActive, setSubscriptionIsActive] = useState(true);
  const [modalConfirmCancelPlanIsOpen, setModalConfirmCancelPlanIsOpen] =
    useState(false);
  const router = useRouter();
  const { plan } = useCompany();

  const isFreePlan = plan.value === IPlanSubscriptionValue.Free

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <Card>
          <Paragraph className="font-medium !text-base">Plano</Paragraph>
          <Line className="my-4" />
          <Paragraph className="font-medium !text-base">Grátis</Paragraph>
          <Paragraph className="!text-xs !text-default-grey">
            Para estudantes, testers e amadores.
          </Paragraph>
          <Button
            className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
            rightIcon={<ArrowRight color="#FFF" size={20} />}
            onClick={() => router.push("/plans")}
          >
            Conferir upgrades de plano
          </Button>
        </Card>

        <Card>
          <Paragraph className="font-medium !text-base">
            Histórico de cobranças
          </Paragraph>
          <Paragraph className="!text-xs !text-default-grey">
            Histórico dos pagamentos das cobranças referentes apenas ao valor do
            seu <span className="text-primary">plano</span>.
          </Paragraph>
          <Line className="my-4" />
          <div className="mt-4">
            <TableInvoicesPayments invoices={INVOICES_MOCK} />
          </div>
        </Card>
        {!isFreePlan && <Card>
          <Paragraph className="font-medium !text-base">
            {subscriptionIsActive ? "Cancelar assinatura" : "Reativar assinatura"}
          </Paragraph>
          <Line className="my-4" />
          {subscriptionIsActive ? (
            <>
              <Paragraph className="!text-xs !text-default-grey">
              Sua assinatura será renovada em 21/06/2024. 
              </Paragraph>
              <Paragraph className="!text-xs !text-default-grey">
              Para cancelar sua assinatura e evitar a renovação automática, por favor, siga as instruções abaixo.
              </Paragraph>

              <Button
                className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
                rightIcon={<ArrowRight color="#FFF" size={20} />}
                onClick={() => setModalConfirmCancelPlanIsOpen(true)}
              >
                Cancelar assinatura
              </Button>
            </>
          ) : (
            <>
              <Paragraph className="!text-xs !text-default-grey">
                Sua assinatura foi cancelada. Você perderá acesso ao plano{" "}
                {plan.value} em {formatDateToDDMMYYYYHHMM(plan?.nextDueDate, true)}.
                <Paragraph className="!text-xs !text-default-grey">
                  Ao sua assinatura expirar, todos os membros perderão acesso.
                </Paragraph>
              </Paragraph>
              <Button
                className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
                rightIcon={<ArrowRight color="#FFF" size={20} />}
              >
                Reativar assinatura
              </Button>
            </>
          )}
        </Card>}
      </div>
      <ModalConfirmCancelPlan
        modalIsOpen={modalConfirmCancelPlanIsOpen}
        setModalIsOpen={setModalConfirmCancelPlanIsOpen}
        setSubscriptionIsActive={setSubscriptionIsActive}
      />
    </>
  );
};
