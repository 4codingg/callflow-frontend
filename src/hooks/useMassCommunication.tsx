import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/utils/toast";
import { getContactsListDetail } from "@/api/contactsList/get-contacts-list-detail";
import { calculateCostMassCommunication } from "@/api/mass-communication/calculate-cost";
import { schemaSendCallsListMessage } from "@/schemas/callsList";
import { formatMessageToBackEnd } from "@/utils/formatMessageToBackEnd";
import { handleErrors } from "@/utils/handleErrors";
import {
  FUNCTION_MASS_COMMUNICATION,
  EMassCommunication,
  LABELS_MASS_COMMUNICATION,
} from "@/constants/massCommunication";
import { fetchAllContactsLists } from "@/api/contactsList/fetch-all-contacts-lists";
import { ICostReports } from "@/@types/MassCommunication";

export const useMassCommunication = ({ type }) => {
  const [contactsListDetail, setContactsListDetail] = useState({
    id: "",
    contacts: [],
    variables: [],
  });
  const [costReports, setCostReports] = useState({} as ICostReports);
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

  const { mutateAsync: calculateCostMassCommunicationFn } = useMutation({
    mutationFn: calculateCostMassCommunication,
  });

  const formik = useFormik({
    initialValues: {
      contactsListId: "",
      message: "",
      destinationVariable: "",
      ...(type === EMassCommunication.Email && { subject: "" }),
    },
    validationSchema: schemaSendCallsListMessage,
    onSubmit: () => {},
  });

  const { values, setFieldValue, isValid } = formik;

  const handleChangeContactsList = async (contactsListId) => {
    setFieldValue("contactsListId", contactsListId);
    try {
      const response = await getContactsListDetail({ contactsListId });
      const formattedContacts = response.contacts?.map((contact) => ({
        ...contact.data,
        id: contact.id,
      }));
      setContactsListDetail({ ...response, contacts: formattedContacts });
      calculateCostReports(formattedContacts.length || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDestinationVariable = (destination) => {
    if (!contactsListDetail.variables.length) {
      toast("error", "Selecione uma lista de contatos para prosseguir.");
      return;
    }
    setFieldValue("destinationVariable", destination);
  };

  const handleSendMassCommunication = async () => {
    if (isValid) {
      try {
        await sendMassCommunicationFn({
          destinationVariable: values.destinationVariable,
          contactsListId: contactsListDetail.id,
          message: formatMessageToBackEnd(values.message),
          ...(values.subject && { subject: values.subject }),
        } as any);
        toast("success", LABELS_MASS_COMMUNICATION[type].success.sent);
      } catch (err) {
        handleErrors(err);
      }
    } else {
      toast("error", "Preencha todas as informações!");
    }
  };

  const calculateCostReports = async (contactsListLength) => {
    try {
      const costReportsResponse = await calculateCostMassCommunicationFn({
        type,
        contactsListLength,
      });
      setCostReports(costReportsResponse);
    } catch (err) {
      toast("error", "Algo deu errado.");
    }
  };

  return {
    formik,
    contactsListDetail,
    contactsListsItems,
    costReports,
    handleChangeContactsList,
    handleChangeDestinationVariable,
    handleSendMassCommunication,
  };
};
