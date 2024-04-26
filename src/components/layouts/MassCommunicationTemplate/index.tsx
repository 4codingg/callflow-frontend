import { useState } from "react";
import {
  Button,
  EmptyState,
  Dropdown,
  LayoutWithSidebar,
  Paragraph,
  TableDefault,
  Label,
  Line,
  Card,
} from "@/components";
import { ModalStepByStep } from "@/components/layouts/Modals/ModalStepByStep";
import { ModalConfirmMessage } from "@/components/layouts/Modals/ModalConfirmMessage";
import { ArrowRight, Check, CheckCircle } from "phosphor-react";
import Empty from "@/assets/empty-state.png";
import { useFormik } from "formik";
import { toast } from "@/utils/toast";
import { schemaSendCallsListMessage } from "@/schemas/callsList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllContactsLists } from "@/api/contactsList/fetch-all-contacts-lists";
import {
  getContactsListDetail,
  GetContactsListDetailResponse,
} from "@/api/contactsList/get-contacts-list-detail";
import { formatMessageToBackEnd } from "@/utils/formatMessageToBackEnd";
import { MassCommunicationHeader } from "./MassCommunicationHeader";
import {
  EMassCommunication,
  FUNCTION_MASS_COMMUNICATION,
  IMassCommunicationTemplateProps,
  LABELS_MASS_COMMUNICATION,
} from "@/constants/massCommunication";
import { MassCommunicationModalMessage } from "./MassCommunicationModalMessage";

export const MassCommunicationTemplate = ({
  type,
  modalStepbyStepTitle,
}: IMassCommunicationTemplateProps) => {
  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [modalConfirmMessageIsOpen, setModalConfirmMessageIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactsListDetail, setContactsListDetail] =
    useState<GetContactsListDetailResponse>({
      id: "",
      contacts: [],
      variables: [],
    });

  const queryClient = useQueryClient();

  const { data: contactsListsItems } = useQuery({
    queryKey: ["contacts-lists"],
    queryFn: () => fetchAllContactsLists({ fetchNameOnly: true }),
  });

  const { mutateAsync: sendMassCommunicationFn } = useMutation({
    mutationFn: FUNCTION_MASS_COMMUNICATION[type],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["company-detail"] });
    },
  });

  const { getFieldProps, values, setFieldValue, isValid } = useFormik({
    isInitialValid: false,
    initialValues: {
      contactsListId: "",
      message: "",
      destinationVariable: "",
      ...(type === EMassCommunication.Email && { subject: "" }),
    },
    validationSchema: schemaSendCallsListMessage,
    onSubmit: () => {},
  });

  const handleChangeContactsList = async (contactsListId: string) => {
    setFieldValue("contactsListId", contactsListId);

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

  const handleChangeDestinationVariable = (destination: string) => {
    if (contactsListDetailIsEmpty) {
      toast("error", "Selecione uma lista de contatos para prosseguir.");
      return;
    }

    setFieldValue("destinationVariable", destination);
  };

  const handleOpenMessageModal = () => {
    if (contactsListDetailIsEmpty) {
      toast("error", "Selecione uma lista de contatos para prosseguir.");
      return;
    }

    setModalMessageIsOpen(true);
  };

  const handleConfirm = () => {
    if (isValid) {
      setModalConfirmMessageIsOpen(true);
    } else {
      toast("error", "Preencha todas as informações!");
    }
  };

  const handleSendMassCommunication = async () => {
    try {
      await sendMassCommunicationFn({
        destinationVariable: values.destinationVariable,
        contactsListId: contactsListDetail.id,
        message: formatMessageToBackEnd(values.message),
        ...(values.subject && { subject: values.subject }),
      });

      toast("success", LABELS_MASS_COMMUNICATION[type].success.sent);
      setModalConfirmMessageIsOpen(false);
    } catch (err) {
      toast("error", "Algo deu errado.");
    }
  };

  const contactsListDropdownOptions =
    contactsListsItems?.map(({ name, id }) => {
      return {
        label: name,
        value: id,
      };
    }) || [];

  const contactsListDetailIsEmpty = !contactsListDetail?.variables.length;

  return (
    <>
      <LayoutWithSidebar hiddenInput={true}>
        {isValid && (
          <Button
            type="button"
            className=" !h-[48px] !w-[200px] rounded-2xl text-xs font-medium fixed bottom-16 right-16"
            onClick={handleConfirm}
            // disabled={!isValid}
          >
            Enviar <Check size={18} color="#FFF" />
          </Button>
        )}
        <MassCommunicationHeader
          type={type}
          handleOpenModalInstructions={() => setModalStepByStepIsOpen(true)}
        />
        <div className="flex flex-col justify-between gap-4">
          <section className="flex flex-col mt-6 gap-8 w-full flex-1">
            <Dropdown
              options={contactsListDropdownOptions}
              label="Lista de Contatos"
              placeholder="Seleciona a lista de contatos"
              onValueChange={handleChangeContactsList}
              {...getFieldProps("contactsListId")}
            />
            {!contactsListDetailIsEmpty && (
              <>
                <div className="flex flex-col gap-3 w-full">
                  <Label className="font-semibold text-sm">Mensagem</Label>
                  <button
                    className="rounded flex items-center justify-between h-[40px] border p-3 w-full"
                    onClick={handleOpenMessageModal}
                    type="button"
                  >
                    <Paragraph className="text-primary text-ellipsis truncate overflow-hidden">
                      {values.message
                        ? values.message
                        : "Personalize sua mensagem"}
                    </Paragraph>
                    <div className="min-w-[16px]">
                      {values.message && <CheckCircle color="#00DEA3" />}
                    </div>
                  </button>
                </div>
                <Dropdown
                  options={contactsListDetail?.variables}
                  label="Variável de Destino"
                  placeholder="Seleciona a variável de destino"
                  onValueChange={handleChangeDestinationVariable}
                  {...getFieldProps("destinationVariable")}
                />
                <div className="flex flex-col w-full gap-3">
                  <Label className="font-semibold text-sm">Custo</Label>
                  <div className="flex items-center gap-4">
                    <div className="bg-default-grey bg-opacity-30 rounded flex items-center justify-between gap-4 h-[40px] p-3 w-full">
                      <Paragraph className="text-primary">R$ 30,00</Paragraph>
                      <Paragraph className="text-black text-xs text-opacity-70">
                        (R$0,10 / contato)
                      </Paragraph>
                    </div>
                  </div>
                  <button className="flex items-center gap-4">
                    <Paragraph className="text-primary">
                      Checar relatório de custo
                    </Paragraph>
                    <ArrowRight color="#783EFD" weight="bold" />
                  </button>
                </div>
              </>
            )}
          </section>
          <div className="flex">
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
              <Card className="w-full">
                <Paragraph className="font-medium !text-xl ">
                  Contatos
                </Paragraph>
                <Paragraph className="!text-xs !text-default-grey">
                  Confira alguns contatos da sua lista.
                </Paragraph>
                <Line className="my-4" />
                <div className="mt-4">
                  <TableDefault
                    content={contactsListDetail?.contacts}
                    disableEditItem
                    disableAccessItem
                    disableDeleteItem
                  />
                </div>
              </Card>
            )}
          </div>
        </div>
      </LayoutWithSidebar>
      <ModalStepByStep
        modalIsOpen={modalStepByStepIsOpen}
        setModalIsOpen={setModalStepByStepIsOpen}
        type={type}
        title={modalStepbyStepTitle}
      />
      <ModalConfirmMessage
        modalIsOpen={modalConfirmMessageIsOpen}
        setModalIsOpen={setModalConfirmMessageIsOpen}
        contactsListDetail={contactsListDetail}
        message={values.message}
        handleSendMassCommunication={handleSendMassCommunication}
        destinationVariable={values.destinationVariable}
      />
      <MassCommunicationModalMessage
        type={type}
        modalIsOpen={modalMessageIsOpen}
        setModalIsOpen={setModalMessageIsOpen}
        message={values.message}
        setMessage={(value) => setFieldValue("message", value)}
        setSubject={(value) => setFieldValue("subject", value)}
        contactsListDetail={contactsListDetail}
      />
    </>
  );
};
