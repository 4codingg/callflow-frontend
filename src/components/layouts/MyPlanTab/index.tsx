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
import "react-credit-cards/es/styles-compiled.css";
import { useCompany } from "@/hooks/useCompany";
import { formatData } from "@/utils/formatDatetoDDMMYYYY";

export const MyPlanTab = () => {
  const [subscriptionIsActive, setSubscriptionIsActive] = useState(true);
  const [modalConfirmCancelPlanIsOpen, setModalConfirmCancelPlanIsOpen] =
    useState(false);
  const router = useRouter();
  const { plan } = useCompany();

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
        <Card>
          <Paragraph className="font-medium !text-base">
            {subscriptionIsActive ? "Cancelar assinatura" : ""}
          </Paragraph>
          <Line className="my-4" />
          {subscriptionIsActive ? (
            <>
              <Paragraph className="!text-xs !text-default-grey">
                Sua assinatura será renovada em {formatData(plan.nextDueDate)}.
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
                {plan.value} em {formatData(plan.nextDueDate)}.
                <Paragraph className="!text-xs !text-default-grey">
                  Ao sua assinatura expirar, todos os membros perderão acesso.
                </Paragraph>
              </Paragraph>
              <Button
                className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
                rightIcon={<ArrowRight color="#FFF" size={20} />}
              >
                Renovar assinatura
              </Button>
            </>
          )}
        </Card>
      </div>
      <ModalConfirmCancelPlan
        modalIsOpen={modalConfirmCancelPlanIsOpen}
        setModalIsOpen={setModalConfirmCancelPlanIsOpen}
        setSubscriptionIsActive={setSubscriptionIsActive}
      />
    </>
  );
};
