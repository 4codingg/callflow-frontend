import { Button, ButtonVariant } from "@/components/Button";
import { DropdownPaymentMethods } from "@/components/DropdownPaymentMethods";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { MOCK_PAYMENTS_METHODS } from "@/constants/tabsWallet";
import { useCallsList } from "@/hooks/useCallsList";

import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

interface IModalConfirmedCancelPlan {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddItem?: any;
}

export const ModalConfirmedCancelPlan = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalConfirmedCancelPlan) => {
  function HandleConfirmedCancelPlan() {
    setModalIsOpen(false);
  }

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white p-4 min-w-[430px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Cancelar Assinatura
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <div className="flex flex-col mt-8 gap-8">
            <section className="flex flex-col gap-2 items-center justify-start">
              <Paragraph className=" text-black !font-poppins !font-semibold !text-xl">
                Tem certeza que quer cancelar sua assinatura?
              </Paragraph>
              <Paragraph className="!text-xs !text-default-grey">
                Ao cancelar sua assinatura, todos os membros perderão acesso.
              </Paragraph>
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
              className="!w-[109px] !h-[48px] font-medium !p-2"
              onClick={HandleConfirmedCancelPlan}
            >
              Confirmar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
