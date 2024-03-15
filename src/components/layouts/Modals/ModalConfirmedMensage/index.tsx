import { Button, ButtonVariant } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import {
  INSTRUCTIONS,
  MOCK_CONTACTS,
  OPTIONSLIST,
} from "@/constants/contentCalls";
import { Contact } from "@/interfaces";
import Image from "next/image";
import { ArrowArcRight, ArrowRight, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import Rocket from "@/assets/icons/rocket-launch.svg";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { toast } from "@/utils/toast";

interface ImodalConfirmedMensageProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalConfirmedMensage = ({
  setModalIsOpen,
  modalIsOpen,
}: ImodalConfirmedMensageProps) => {
  const handleSave = () => {
    setModalIsOpen(false);
  };
  function handleSubmit() {
    setModalIsOpen(false);
    toast("success", "Envio de SMSs em massa realizado com sucesso!");
  }
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-4 min-w-[700px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Confirme as Informações do seu envio em massa
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <form
            className="mt-6 flex flex-col gap-4 min-w-[600px] max-h-[80vh]"
            onSubmit={handleSave}
          >
            <Dropdown options={OPTIONSLIST} label="Lista de Contatos" />
            <section className="flex gap-[16px] my-[32px]">
              <Input
                type="text"
                label="Contatos"
                placeholder="Contatos"
                className=" font-normal text-grey-input h-[40px]"
                disableError
                disabled
              />
              <Input
                type="text"
                label="Custo"
                disableError
                className="h-[40px] font-normal  text-primary"
                disabled
                value={"R$ 3,00"}
              />
            </section>
            <TextArea
              label="Mensagem"
              placeholder="Olá [Nome], 
              Seja bem-vindo(a).
            "
              className="mt-[24px]"
            />
            <section className="flex justify-end mt-[17px]">
              <Button
                type="button"
                className="text-xs font-normal !w-[197px] h-[48px] "
                onClick={handleSubmit}
              >
                Confirmar e Enviar <ArrowRight size={18} />
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
