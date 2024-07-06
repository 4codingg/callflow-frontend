import { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import { getContactsListDetail } from '@/api/contactsList/get-contacts-list-detail';
import { calculateCostMassCommunication } from '@/api/mass-communication/calculate-cost';
import { schemaSendCallsListMessage } from '@/schemas/callsList';
import { formatMessageToBackEnd } from '@/utils/formatMessageToBackEnd';
import { handleErrors } from '@/utils/handleErrors';
import {
  FUNCTION_MASS_COMMUNICATION,
  EMassCommunication,
  LABELS_MASS_COMMUNICATION,
} from '@/constants/massCommunication';
import { fetchAllContactsLists } from '@/api/contactsList/fetch-all-contacts-lists';
import { ICostReports } from '@/@types/MassCommunication';
import { useGlobalLoading } from './useGlobalLoading';
import { scheduleMassCommunication } from '@/api/mass-communication/schedule-mass-communication';
import { useRouter } from 'next/router';

export const useMassCommunication = ({ type }) => {
  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [modalConfirmMessageIsOpen, setModalConfirmMessageIsOpen] =
    useState(false);
  const [modalCostReportIsOpen, setModalCostReportIsOpen] = useState(false);
  const [contactsListDetail, setContactsListDetail] = useState({
    id: '',
    contacts: [],
    variables: [],
    emailDestinationVariable: '',
    phoneDestinationVariable: '',
  });
  const [costReports, setCostReports] = useState({} as ICostReports);
  const [isLoading, setIsLoading] = useState(false);

  const { setGlobalLoading } = useGlobalLoading();
  const queryClient = useQueryClient();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      contactsListId: '',
      message: '',
      destinationVariable:
        type === EMassCommunication.Email
          ? contactsListDetail.emailDestinationVariable
          : contactsListDetail.phoneDestinationVariable,
      ...(type === EMassCommunication.Email && { subject: '' }),
      reproduceAt: '',
    },
    validationSchema: schemaSendCallsListMessage,
    onSubmit: () => {},
  });

  const { values, setFieldValue, isValid } = formik;

  const { data: contactsListsItems } = useQuery({
    queryKey: ['contacts-lists'],
    queryFn: () => fetchAllContactsLists({ fetchNameOnly: true }),
  });

  const { mutateAsync: sendMassCommunicationFn } = useMutation({
    mutationFn: values.reproduceAt
      ? scheduleMassCommunication
      : FUNCTION_MASS_COMMUNICATION[type],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['company-detail'] });
    },
  });

  const { mutateAsync: calculateCostMassCommunicationFn } = useMutation({
    mutationFn: calculateCostMassCommunication,
  });

  const handleChangeContactsList = async (contactsListId: string) => {
    setFieldValue('contactsListId', contactsListId);

    setIsLoading(true);
    try {
      const response = await getContactsListDetail({ contactsListId });

      const formattedContacts = response.contacts?.map((contact) => {
        return {
          ...contact.data,
          id: contact.id,
        };
      });

      setContactsListDetail({ ...response, contacts: formattedContacts });
      await calculateCostReports(formattedContacts.length || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCostReports = async (contactsListLength: number) => {
    setGlobalLoading(true);
    try {
      const costReportsResponse = await calculateCostMassCommunicationFn({
        type,
        contactsListLength,
      });
      setCostReports(costReportsResponse);
    } catch (err) {
      toast('error', 'Algo deu errado.');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleChangeDestinationVariable = (destination: string) => {
    if (contactsListDetailIsEmpty) {
      toast('error', 'Selecione uma lista de contatos para prosseguir.');
      return;
    }

    setFieldValue('destinationVariable', destination);
  };

  const handleConfirmSendMassCommunication = () => {
    if (isValid) {
      setModalConfirmMessageIsOpen(true);
    } else {
      toast('error', 'Preencha todas as informações!');
    }
  };

  const handleSendMassCommunication = async () => {
    setIsLoading(true);
    try {
      const response: any = await sendMassCommunicationFn({
        destinationVariable: values.destinationVariable,
        contactsListId: contactsListDetail.id,
        message: formatMessageToBackEnd(values.message),
        ...(values.subject && { subject: values.subject }),
        type: type,
        reproduceAt: values.reproduceAt,
      } as any);

      toast(
        'success',
        LABELS_MASS_COMMUNICATION[type][
          values.reproduceAt ? 'scheduled' : 'success'
        ].sent
      );
      setModalConfirmMessageIsOpen(false);
      router.push(`/metrics/reports/${response.reportId}`);
    } catch (err) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const contactsListDetailIsEmpty = !contactsListDetail?.variables?.length;

  return {
    formik,
    contactsListDetail,
    contactsListsItems,
    costReports,
    handleChangeContactsList,
    handleChangeDestinationVariable,
    handleSendMassCommunication,
    isLoading,
    modalStepByStepIsOpen,
    setModalStepByStepIsOpen,
    modalMessageIsOpen,
    setModalMessageIsOpen,
    modalConfirmMessageIsOpen,
    setModalConfirmMessageIsOpen,
    modalCostReportIsOpen,
    setModalCostReportIsOpen,
    handleConfirmSendMassCommunication,
  };
};
