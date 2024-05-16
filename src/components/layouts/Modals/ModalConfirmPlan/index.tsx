import { Button, ButtonVariant } from "@/components/Button";
import { DropdownPaymentMethods } from "@/components/DropdownPaymentMethods";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import {
  MOCK_ADD_BALANCE,
  MOCK_PAYMENTS_METHODS,
} from "@/constants/tabsWallet";

import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

interface IModalConfirmPlan {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalConfirmPlan = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalConfirmPlan) => {
  const [paymentMethodId, setPaymentMethodId] = useState(
    MOCK_PAYMENTS_METHODS[0].id.toString()
  );
  const [value, setValue] = useState(0);

  const handleChangePaymentMethod = (id: string) => {
    setPaymentMethodId(id);
  };

  function handleAssignSubscription() {}

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[430px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Pronto para assinar?
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <div className="flex flex-col mt-8 gap-8">
            <section>
              <Paragraph className="!text-xs !text-black">
                Ao confirmar sua assinatura, você desfrutará de todos os
                benefícios do nosso plano
                <span className=" font-bold text-primary"> Premium</span>. Esta
                ação resultará em uma cobrança automática mensal.
              </Paragraph>
              <Paragraph className="!text-xs !text-black mt-1">
                Deseja continuar?
              </Paragraph>
            </section>

            <section className="flex gap-2 h-20 items-center">
              <Paragraph className=" text-primary text-center !font-poppins !font-semibold !text-3xl">
                R$
              </Paragraph>
              <Paragraph className=" text-black !font-poppins !font-semibold !text-5xl">
                {value},<span className="!text-3xl"> 00 </span>
                <span className="text-default-grey !text-xs"> /mês</span>
              </Paragraph>
            </section>
            <section className="flex justify-center items-center">
              <DropdownPaymentMethods
                options={MOCK_PAYMENTS_METHODS}
                value={paymentMethodId}
                onValueChange={handleChangePaymentMethod}
              />
            </section>
          </div>
          <section className="flex justify-end items-center gap-4 mt-8">
            <Button
              leftIcon={<X size={24} />}
              type="button"
              className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              Descartar Alterações
            </Button>
            <Button
              leftIcon={<CheckCircle size={24} />}
              type="submit"
              className="!w-[109px] !h-[48px] font-medium"
              onClick={() => handleAssignSubscription}
            >
              Salvar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};