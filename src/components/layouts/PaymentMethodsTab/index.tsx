import { useState } from "react";
import { ArrowRight, FloppyDisk, PlusCircle } from "phosphor-react";
import { Button, Card, Line, Paragraph, Spinner } from "@/components";
import { TablePaymentMethods } from "@/components/layouts/Tables/TablePaymentMethods";
import { DropdownPaymentMethods } from "@/components/DropdownPaymentMethods";
import { ModalAddBalance } from "../Modals/ModalAddBalance";
import { useCompany } from "@/hooks/useCompany";
import { EmptyState } from "@/components/EmptyState";
import Empty from "@/assets/empty-state.png";
import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDefaultPaymentMethod } from "@/api/wallet/update-default-payment-method";

export const PaymentMethodsTab = ({ setModalAddPaymentMethodIsOpen }) => {
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState("");
  const [modalAddBalanceIsOpen, setModalAddBalanceIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState({
    paymentMethod: false,
  });

  const { companyDetail, paymentsMethods } = useCompany();
  const queryClient = useQueryClient();

  const { mutateAsync: updateDefaultPaymentMethodFn } = useMutation({
    mutationFn: updateDefaultPaymentMethod,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["company-payment-methods"],
      });
    },
  });

  const handleChangePaymentMethod = (
    paymentMethodId: string,
    isDefaultValue?: boolean
  ) => {
    setPaymentMethod(paymentMethodId);

    if (!isDefaultValue) {
      setPendingPaymentMethod(paymentMethodId);
    }
  };

  const handleSavePaymentMethodAsDefault = async () => {
    setIsLoading({
      ...isLoading,
      paymentMethod: true,
    });
    try {
      if (pendingPaymentMethod) {
        await updateDefaultPaymentMethodFn({
          paymentMethodId: pendingPaymentMethod,
        });
        setPaymentMethod(pendingPaymentMethod);
        setPendingPaymentMethod("");
        toast("success", "Método de pagamento padrão atualizado com sucesso!");
      }
    } catch (error) {
      toast("error", "Falha ao atualizar o método de pagamento padrão.");
    } finally {
      setIsLoading({
        ...isLoading,
        paymentMethod: false,
      });
    }
  };

  const paymentMethodsIsEmpty = paymentsMethods?.length === 0;

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
            <Paragraph className="font-medium !text-xl">
              R$ {companyDetail?.balance}
            </Paragraph>
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
            options={paymentsMethods}
            onValueChange={handleChangePaymentMethod}
            value={paymentMethod}
          />
          <Button
            className="!w-[100px] !h-[40px] font-normal !text-xs"
            rightIcon={<FloppyDisk color="#FFF" size={20} />}
            onClick={handleSavePaymentMethodAsDefault}
            disabled={!pendingPaymentMethod || isLoading.paymentMethod}
          >
            {isLoading.paymentMethod ? <Spinner /> : "Salvar"}
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
          {paymentMethodsIsEmpty ? (
            <EmptyState
              description="Ainda não temos  nenhuma forma de pagamento registrada"
              title="Sem metódo de pagamento"
              icon={Empty}
            />
          ) : (
            <TablePaymentMethods paymentMethods={paymentsMethods} />
          )}
        </div>
      </Card>
      <ModalAddBalance
        modalIsOpen={modalAddBalanceIsOpen}
        setModalIsOpen={setModalAddBalanceIsOpen}
      />
    </div>
  );
};
