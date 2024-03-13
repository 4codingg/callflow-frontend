import {
  LayoutWithSidebar,
  Heading,
  Paragraph,
  Table,
  HeadingSizeVariant,
} from "@/components";
import { Button, ButtonSizeVariant } from "@/components/Button";
import { CONTENT_CALLS } from "@/constants/contentCalls";
import { useRouter } from "next/router";
import Information from "@/assets/icons/information-circle.svg";
import Image from "next/image";
import { Input } from "@/components/Input";
import { Check } from "phosphor-react";
import { EmptyState } from "@/components/EmptyState";
import Empty from "@/assets/empty-state.png";
import { ModalStepByStep } from "@/components/layouts/Modals/ModalStepByStep";
import { useState } from "react";

export const MessagesTemplate = () => {
  const router = useRouter();
  const handleAccessItem = (id: string) => {
    router.push("/messages/" + id);
  };

  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);

  function handleInstructions() {
    setModalStepByStepIsOpen(true);
  }
  return (
    <>
      <LayoutWithSidebar hiddenInput={true}>
        <header className="flex justify-between items-center">
          <div className="flex flex-col">
            <Heading size={HeadingSizeVariant.Large}>
              Enviar SMS em massa
            </Heading>
            <Paragraph className="mt-2 font-normal">
              Selecione a lista de contatos, a mensagem a ser enviada e dispare
              sua lista em massa.
            </Paragraph>
            <Button
              onClick={handleInstructions}
              className="  !bg-grey-information !w-[165px] !h-[48px] mt-[24px]"
            >
              <Image src={Information} alt="circle-information" />
              <Paragraph className=" text-xs font-medium text-purple-secundary">
                {" "}
                Passo a Passo
              </Paragraph>{" "}
            </Button>
          </div>
        </header>
        <div className="flex justify-between items-end gap-[24px] ">
          <section className="flex gap-[24px] w-full mt-[42px] max-w-[85%] ">
            <Input
              type="select"
              label="Lista de Contatos"
              placeholder="Selecione sua lista"
              className=" font-normal text-grey-input h-[40px] "
              disableError
            />
            <Input
              type="text"
              label="Mensagem"
              placeholder="Crie sua mensagem para ser disparada"
              className=" font-normal text-grey-input h-[40px]"
              disableError
            />
            <Input
              type="text"
              label="Custo"
              disableError
              className="h-[40px] font-normal text-primary"
              disabled
              value={"R$ 3,00"}
            />
          </section>
          <Button
            className=" !h[48px] !w-[160px] rounded-2xl text-xs font-medium "
            disabled
          >
            Enviar para lista <Check size={18} />
          </Button>
        </div>
        <div className="mt-8 flex w-full">
          {CONTENT_CALLS.length == 0 ? (
            <div className="flex w-full justify-center mt-16">
              <EmptyState
                description="Nenhuma lista foi selecionada,
selecione para enviar suas mensagens"
                textButton="Selecionar Lista"
                title="Nenhuma lista selecionada"
                icon={Empty}
              />
            </div>
          ) : (
            <Table
              content={CONTENT_CALLS}
              handleAccessItem={handleAccessItem}
              disableEditItem
            />
          )}
        </div>
      </LayoutWithSidebar>
      <ModalStepByStep
        modalIsOpen={modalStepByStepIsOpen}
        setModalIsOpen={setModalStepByStepIsOpen}
      />
    </>
  );
};
