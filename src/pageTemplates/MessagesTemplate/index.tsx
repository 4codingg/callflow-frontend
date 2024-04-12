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
import Information from '@/assets/icons/information-circle.svg';
import { Check, CheckCircle } from 'phosphor-react';
import Empty from '@/assets/empty-state.png';
import { useFormik } from 'formik';
import { toast } from '@/utils/toast';
import { schemaSendCallsListMessage } from '@/schemas/callsList';
import { ModalMessage } from '@/components/layouts/Modals/ModalMessage';
import { useQuery } from '@tanstack/react-query';
import { fetchAllContactsLists } from '@/api/contactsList/fetch-all-contacts-lists';
import {
  getContactsListDetail,
  GetContactsListDetailResponse,
} from '@/api/contactsList/get-contacts-list-detail';

export const MessagesTemplate = () => {
  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [modalConfirmMessageIsOpen, setModalConfirmMessageIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactsListDetail, setContactsListDetail] =
    useState<GetContactsListDetailResponse>({
      id: '',
      contacts: [],
      variables: [],
    });

  const { data: contactsListsItems } = useQuery({
    queryKey: ['contacts-lists'],
    queryFn: () => fetchAllContactsLists({ fetchNameOnly: true }),
    staleTime: Infinity,
  });

  const { getFieldProps, values, setFieldValue, handleChange, isValid } =
    useFormik({
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
    if (isValid) {
      setModalConfirmMessageIsOpen(true);
    } else {
      toast('error', 'Preencha todas as informações!');
    }
  };

  const handleChangeContactsList = async (contactsListId: string) => {
    setFieldValue('contactsListId', contactsListId);

    setIsLoading(true);
    try {
      const response = await getContactsListDetail({ contactsListId });

      const formattedContacts = response.contacts.map((contact) => {
        return {
          ...contact.data,
          id: contact.id,
        };
      });

      setContactsListDetail({ ...response, contacts: formattedContacts });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenMessageModal = () => {
    if (!contactsListDetail?.variables.length) {
      toast('error', 'Selecione uma lista de contatos para prosseguir.');
      return;
    }

    setModalMessageIsOpen(true);
  };

  const contactsListDropdownOptions =
    contactsListsItems?.map(({ name, id }) => {
      return {
        label: name,
        value: id,
      };
    }) || [];

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
              options={contactsListDropdownOptions}
              label="Lista de Contatos"
              placeholder="Seleciona a lista de contatos"
              onValueChange={handleChangeContactsList}
              {...getFieldProps('contactsListId')}
            />
            <div className="flex flex-col gap-3 w-full max-w-[33%]">
              <Label className="font-semibold text-sm">Mensagem</Label>
              <button
                className="rounded flex items-center justify-between h-[40px] border p-3 w-full"
                onClick={handleOpenMessageModal}
              >
                <Paragraph className="text-primary text-ellipsis truncate overflow-hidden">
                  {values.message ? values.message : 'Personalize sua mensagem'}
                </Paragraph>
                {values.message && <CheckCircle color="#00DEA3" />}
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
            disabled={!isValid}
            rightIcon={<Check size={18} />}
          >
            Enviar para lista
          </Button>
        </div>
        <div className="mt-8 flex w-full">
          {contactsListDetail.contacts.length == 0 ? (
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
                content={contactsListDetail?.contacts}
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
        contactsListDetail={contactsListDetail}
        message={values.message}
      />
      <ModalMessage
        modalIsOpen={modalMessageIsOpen}
        setModalIsOpen={setModalMessageIsOpen}
        variables={contactsListDetail?.variables}
        exampleItem={
          !!contactsListDetail?.contacts.length &&
          contactsListDetail?.contacts[0]
        }
        message={values.message}
        setMessage={(value) => setFieldValue('message', value)}
      />
    </>
  );
};
