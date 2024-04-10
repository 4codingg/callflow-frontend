import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Button,
  Input,
  EmptyState,
  Dropdown,
  LayoutWithSidebar,
  Heading,
  Paragraph,
  TableDefault,
  HeadingSizeVariant,
  Label,
} from '@/components';
import { ModalStepByStep } from '@/components/layouts/Modals/ModalStepByStep';
import { ModalConfirmMessage } from '@/components/layouts/Modals/ModalConfirmMessage';
import { MOCK_CONTACTS, OPTIONS_LIST } from '@/constants/contentCalls';
import Information from '@/assets/icons/information-circle.svg';
import { Check, CheckCircle } from 'phosphor-react';
import Empty from '@/assets/empty-state.png';
import { useFormik } from 'formik';
import { toast } from '@/utils/toast';
import { schemaSendCallsListMessage } from '@/schemas/callsList';
import { ModalMessage } from '@/components/layouts/Modals/ModalMessage';

export const MessagesTemplate = () => {
  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [modalConfirmMessageIsOpen, setModalConfirmMessageIsOpen] =
    useState(false);
  const [contacts, setContacts] = useState(MOCK_CONTACTS);

  const formik = useFormik({
    isInitialValid: false,
    initialValues: {
      contactsListId: '',
      message: '',
      cost: '',
    },
    validationSchema: schemaSendCallsListMessage,
    onSubmit: () => {},
  });

  const router = useRouter();

  const handleAccessItem = (id: string) => {
    router.push('/messages/' + id);
  };

  const handleOpenModalInstructions = () => {
    setModalStepByStepIsOpen(true);
  };

  const handleConfirm = () => {
    if (formik.isValid) {
      setModalConfirmMessageIsOpen(true);
    } else {
      toast('error', 'Preencha todas as informações!');
    }
  };

  return (
    <>
      <LayoutWithSidebar hiddenInput={true}>
        <header className="flex justify-between items-center">
          <div className="flex flex-col">
            <Heading size={HeadingSizeVariant.Large}>
              Enviar SMS em massa
            </Heading>
            <Paragraph className="mt-2 font-normal !text-default-grey">
              Selecione a lista de contatos, a mensagem a ser enviada e dispare
              sua lista em massa.
            </Paragraph>
            <Button
              onClick={handleOpenModalInstructions}
              className="!bg-light-primary !w-[165px] !h-[48px] mt-[24px]"
            >
              <Image src={Information} alt="circle-information" />
              <Paragraph className=" text-xs font-medium text-purple-secundary">
                Passo a Passo
              </Paragraph>
            </Button>
          </div>
        </header>
        <div className="flex justify-between items-end gap-6">
          <section className="flex gap-6 w-full mt-6 max-w-[85%] ">
            <Dropdown
              options={OPTIONS_LIST}
              label="Lista de Contatos"
              placeholder="Seleciona a lista de contatos"
              {...formik.getFieldProps('contactsListId')}
            />
            <div className="flex flex-col gap-3 w-full">
              <Label className="font-semibold text-sm">Mensagem</Label>
              <button
                className="rounded flex items-center justify-between h-[40px] border p-3 w-full"
                onClick={() => setModalMessageIsOpen(true)}
              >
                <Paragraph className="text-primary">
                  Personalize sua mensagem
                </Paragraph>
                <CheckCircle color="#00DEA3" />
              </button>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Label className="font-semibold text-sm">Custo</Label>
              <div className="bg-default-grey bg-opacity-30 rounded flex items-center justify-between h-[40px] p-3 w-full">
                <Paragraph className="text-primary">R$ 30,00</Paragraph>
                <Paragraph className="text-black text-xs text-opacity-70">
                  (R$0,10 / contato)
                </Paragraph>
              </div>
            </div>
          </section>
          <Button
            className=" !h-[48px] !w-[160px] rounded-2xl text-xs font-medium"
            onClick={handleConfirm}
            disabled={!formik.isValid}
            rightIcon={<Check size={18} />}
          >
            Enviar para lista
          </Button>
        </div>
        <div className="mt-8 flex w-full">
          {contacts.length == 0 ? (
            <div className="flex w-full justify-center mt-16">
              <EmptyState
                description="Nenhuma lista foi selecionada, selecione para enviar suas mensagens"
                textButton="Selecionar Lista"
                title="Nenhuma lista selecionada"
                icon={Empty}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 bg-white">
              <Heading>Contatos</Heading>
              <TableDefault
                content={MOCK_CONTACTS}
                handleAccessItem={handleAccessItem}
                disableEditItem
              />
            </div>
          )}
        </div>
      </LayoutWithSidebar>
      <ModalStepByStep
        modalIsOpen={modalStepByStepIsOpen}
        setModalIsOpen={setModalStepByStepIsOpen}
      />
      <ModalConfirmMessage
        modalIsOpen={modalConfirmMessageIsOpen}
        setModalIsOpen={setModalConfirmMessageIsOpen}
      />
      <ModalMessage
        modalIsOpen={modalMessageIsOpen}
        setModalIsOpen={setModalMessageIsOpen}
      />
    </>
  );
};
