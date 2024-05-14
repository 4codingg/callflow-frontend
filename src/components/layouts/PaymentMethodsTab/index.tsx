import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TablePaymentMethods } from "@/components/layouts/Tables/TablePaymentMethods";
import { Line } from "@/components/Line";
import { Paragraph } from "@/components/Paragraph";

import { ArrowRight, FloppyDisk, PlusCircle } from "phosphor-react";
import { DropdownPaymentMethods } from "@/components/DropdownPaymentMethods";
import { useState } from "react";
import { ModalAddBalance } from "../Modals/ModalAddBalance";
import { useQuery } from "@tanstack/react-query";
import { getCompanyPaymentMethods } from "@/api/wallet/getCompanyPaymentMethods";
import { useCompany } from "@/hooks/useCompany";

export const PaymentMethodsTab = ({ setModalAddPaymentMethodIsOpen }) => {
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState("");
  const [modalAddBalanceIsOpen, setModalAddBalanceIsOpen] = useState(false);
  const { companyDetail } = useCompany();
  const Balance = companyDetail.balance;

  const handleChangePaymentMethod = (paymentMethodId: string) => {
    setPendingPaymentMethod(paymentMethodId);
  };

  const { data: methodsPayments } = useQuery({
    queryKey: ["/transactions/get-company-payment-methods"],
    queryFn: () => getCompanyPaymentMethods(),
  });

  const handleSavePaymentMethodAsDefault = () => {};

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Card>
        <Paragraph className="font-medium !text-base">Seu saldo</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Saldo disponível para fazer ações na plataforma
          <span className="text-primary"> call.flow</span>
        </Paragraph>
        <Line className="my-4" />
        <div className=" flex items-center">
          <div className=" flex gap-2 flex-col">
            <Paragraph className="!text-sm !text-default-grey">
              Saldo total
            </Paragraph>
            <Paragraph className="font-medium !text-xl">R$ {Balance}</Paragraph>
          </div>
        </div>
        <Button
          className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
          rightIcon={<ArrowRight color="#FFF" size={20} />}
          onClick={() => setModalAddBalanceIsOpen(true)}
        >
          Adicionar saldo
        </Button>
      </Card>
      <Card>
        <Paragraph className="font-medium !text-base">
          Método de pagamento
        </Paragraph>
        <Line className="my-4 mb-6" />
        <div className="flex gap-4 items-center flex-row justify-start">
          <DropdownPaymentMethods
            options={methodsPayments}
            onValueChange={handleChangePaymentMethod}
          />
          <Button
            disabled={!pendingPaymentMethod}
            className="!w-[100px] !h-[40px] font-normal !text-xs"
            rightIcon={<FloppyDisk color="#FFF" size={20} />}
            onClick={handleSavePaymentMethodAsDefault}
          >
            Salvar
          </Button>
        </div>
        <Button
          className="!w-[260px] h-[40px] font-normal !text-xs mt-6"
          rightIcon={<PlusCircle color="#FFF" size={20} />}
          onClick={() => setModalAddPaymentMethodIsOpen(true)}
        >
          Adicionar método de pagamento
        </Button>
      </Card>
      <Card>
        <Paragraph className="font-medium !text-base">
          Métodos de pagamentos
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Confira seus métodos de pagamentos
        </Paragraph>
        <Line className="my-4" />
        <div className="mt-4">
          <TablePaymentMethods paymentMethods={methodsPayments} />
        </div>
      </Card>
      <ModalAddBalance
        modalIsOpen={modalAddBalanceIsOpen}
        setModalIsOpen={setModalAddBalanceIsOpen}
      />
    </div>
  );
};
