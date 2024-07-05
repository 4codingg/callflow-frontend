import { Button, EmptyState, Dropdown, LayoutWithSidebar } from '@/components';
import { ModalStepByStep } from '@/components/layouts/Modals/ModalStepByStep';
import { ModalConfirmMessage } from '@/components/layouts/Modals/ModalConfirmMessage';
import { Check } from 'phosphor-react';
import Empty from '@/assets/empty-state.png';
import { ModalCostReports } from '../Modals/ModalCostReport';
import { useRouter } from 'next/router';
import { useMassCommunication } from '@/hooks/useMassCommunication';
import { MassCommunicationHeader } from './MassCommunicationHeader';
import { MassCommunicationModalMessage } from './MassCommunicationModalMessage';
import { MassCommunicationDestinationVariable } from './MassCommunicationDestinationVariable';
import { MassCommunicationScheduleSection } from './MassCommunicationScheduleSection';
import { MassCommunicationCost } from './MassCommunicationCost';
import { MassCommunicationInputMessage } from './MassCommunicationInputMessage';
import { MassCommunicationContacts } from './MassCommunicationContacts';

export const MassCommunicationTemplate = ({ type }) => {
  const router = useRouter();

  const {
    formik,
    contactsListDetail,
    contactsListsItems,
    costReports,
    handleChangeContactsList,
    handleSendMassCommunication,
    isLoading,
    setModalConfirmMessageIsOpen,
    setModalCostReportIsOpen,
    setModalMessageIsOpen,
    setModalStepByStepIsOpen,
    modalConfirmMessageIsOpen,
    modalCostReportIsOpen,
    modalMessageIsOpen,
    modalStepByStepIsOpen,
    handleConfirmSendMassCommunication,
  } = useMassCommunication({ type });

  const { getFieldProps, values, isValid, setFieldValue } = formik;

  const contactsListDropdownOptions =
    contactsListsItems?.map(({ name, id }) => ({
      label: name,
      value: id,
    })) || [];

  const contactsListDetailIsEmpty = !contactsListDetail?.variables?.length;

  return (
    <>
      <LayoutWithSidebar hiddenInput={true}>
        <MassCommunicationHeader
          type={type}
          handleOpenModalInstructions={() => setModalStepByStepIsOpen(true)}
        />
        <div className="flex flex-col justify-between gap-4">
          <section className="flex flex-col mt-6 gap-8 w-full flex-1">
            {contactsListsItems?.length > 0 ? (
              <Dropdown
                options={contactsListDropdownOptions}
                label="Lista de Contatos"
                placeholder="Seleciona a lista de contatos"
                onValueChange={handleChangeContactsList}
                {...getFieldProps('contactsListId')}
              />
            ) : null}

            {!contactsListDetailIsEmpty && (
              <>
                <MassCommunicationInputMessage
                  message={values.message}
                  setModalMessageIsOpen={setModalMessageIsOpen}
                />
                <MassCommunicationDestinationVariable
                  destination={
                    type === 'email'
                      ? contactsListDetail.emailDestinationVariable
                      : contactsListDetail.phoneDestinationVariable
                  }
                />
                <MassCommunicationCost
                  costReports={costReports}
                  setModalCostReportIsOpen={setModalCostReportIsOpen}
                />
                <MassCommunicationScheduleSection
                  setReproduceAt={(e) => setFieldValue('reproduceAt', e)}
                />
              </>
            )}
          </section>
          <div className="flex">
            {contactsListDetail?.contacts?.length == 0 ? (
              <div className="flex w-full justify-center mt-16">
                <EmptyState
                  description={
                    contactsListsItems?.length > 0
                      ? 'Selecione uma lista para enviar suas mensagens'
                      : `Clique em criar lista de contatos para prosseguir`
                  }
                  textButton={
                    contactsListsItems?.length == 0
                      ? 'Criar lista de contatos'
                      : null
                  }
                  title={
                    contactsListsItems?.length > 0
                      ? 'Nenhuma lista selecionada'
                      : 'Nenhuma lista foi criada'
                  }
                  actionButton={
                    contactsListsItems?.length == 0
                      ? () => router.push('/contacts/create-list')
                      : null
                  }
                  icon={Empty}
                />
              </div>
            ) : (
              <MassCommunicationContacts
                contacts={contactsListDetail?.contacts || []}
              />
            )}
          </div>
        </div>
        {isValid && values.message && (
          <Button
            type="button"
            className=" mx-auto mt-6 !h-[48px] !w-[200px] rounded-2xl text-xs font-medium"
            onClick={handleConfirmSendMassCommunication}
          >
            Enviar <Check size={18} color="#FFF" />
          </Button>
        )}
      </LayoutWithSidebar>
      <ModalStepByStep
        modalIsOpen={modalStepByStepIsOpen}
        setModalIsOpen={setModalStepByStepIsOpen}
        type={type}
      />
      <ModalConfirmMessage
        modalIsOpen={modalConfirmMessageIsOpen}
        setModalIsOpen={setModalConfirmMessageIsOpen}
        contactsListDetail={contactsListDetail}
        message={values.message}
        handleSendMassCommunication={handleSendMassCommunication}
        destinationVariable={
          type === 'email'
            ? contactsListDetail.emailDestinationVariable
            : contactsListDetail.phoneDestinationVariable
        }
        isLoading={isLoading}
        costReports={costReports}
      />
      <MassCommunicationModalMessage
        type={type}
        modalIsOpen={modalMessageIsOpen}
        setModalIsOpen={setModalMessageIsOpen}
        message={values.message}
        setMessage={(value) => formik.setFieldValue('message', value)}
        setSubject={(value) => formik.setFieldValue('subject', value)}
        contactsListDetail={contactsListDetail}
      />
      <ModalCostReports
        costReports={costReports}
        modalIsOpen={modalCostReportIsOpen}
        setModalIsOpen={setModalCostReportIsOpen}
      />
    </>
  );
};
