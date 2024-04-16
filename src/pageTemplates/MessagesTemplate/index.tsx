// import { useState } from "react";
// import Image from "next/image";
// import {
//   Button,
//   EmptyState,
//   Dropdown,
//   LayoutWithSidebar,
//   Heading,
//   Paragraph,
//   TableDefault,
//   HeadingSizeVariant,
//   Label,
// } from "@/components";
// import { ModalStepByStep } from "@/components/layouts/Modals/ModalStepByStep";
// import { ModalConfirmMessage } from "@/components/layouts/Modals/ModalConfirmMessage";
// import Information from "@/assets/icons/information-circle.svg";
// import { Check, CheckCircle } from "phosphor-react";
// import Empty from "@/assets/empty-state.png";
// import { useFormik } from "formik";
// import { toast } from "@/utils/toast";
// import { schemaSendCallsListMessage } from "@/schemas/callsList";
// import { ModalMessage } from "@/components/layouts/Modals/ModalMessage";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { fetchAllContactsLists } from "@/api/contactsList/fetch-all-contacts-lists";
// import {
//   getContactsListDetail,
//   GetContactsListDetailResponse,
// } from "@/api/contactsList/get-contacts-list-detail";
// import { sendSMSMass } from "@/api/sms/send-sms-mass";
// import { formatMessageToBackEnd } from "@/utils/formatMessageToBackEnd";
// import { MassComunicationTemplate } from "@/components/layouts/MassComunicationTemplate";

import { MassCommunicationTemplate } from "@/components/layouts/MassCommunicationTemplate";
import { EMassCommunication } from "@/constants/massCommunication";

// export const MessagesTemplate = () => {
//   const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
//   const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
//   const [modalConfirmMessageIsOpen, setModalConfirmMessageIsOpen] =
//     useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [contactsListDetail, setContactsListDetail] =
//     useState<GetContactsListDetailResponse>({
//       id: "",
//       contacts: [],
//       variables: [],
//     });

//   const contactsListDetailIsEmpty = !contactsListDetail?.variables.length;

//   const { data: contactsListsItems } = useQuery({
//     queryKey: ["contacts-lists"],
//     queryFn: () => fetchAllContactsLists({ fetchNameOnly: true }),
//     staleTime: Infinity,
//   });

//   const { mutateAsync: sendSmsMassFn } = useMutation({
//     mutationFn: sendSMSMass,
//   });

//   const { getFieldProps, values, setFieldValue, isValid } = useFormik({
//     isInitialValid: false,
//     initialValues: {
//       contactsListId: "",
//       message: "",
//       cost: "",
//       destinationVariable: "",
//     },
//     validationSchema: schemaSendCallsListMessage,
//     onSubmit: () => {},
//   });

//   const handleOpenModalInstructions = () => {
//     setModalStepByStepIsOpen(true);
//   };

//   const handleConfirm = () => {
//     if (isValid) {
//       setModalConfirmMessageIsOpen(true);
//     } else {
//       toast("error", "Preencha todas as informações!");
//     }
//   };

//   const handleChangeContactsList = async (contactsListId: string) => {
//     setFieldValue("contactsListId", contactsListId);

//     setIsLoading(true);
//     try {
//       const response = await getContactsListDetail({ contactsListId });

//       const formattedContacts = response.contacts.map((contact) => {
//         return {
//           ...contact.data,
//           id: contact.id,
//         };
//       });

//       setContactsListDetail({ ...response, contacts: formattedContacts });
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChangeDestinationVariable = (destination: string) => {
//     if (contactsListDetailIsEmpty) {
//       toast("error", "Selecione uma lista de contatos para prosseguir.");
//       return;
//     }

//     setFieldValue("destinationVariable", destination);
//   };

//   const handleOpenMessageModal = () => {
//     if (contactsListDetailIsEmpty) {
//       toast("error", "Selecione uma lista de contatos para prosseguir.");
//       return;
//     }

//     setModalMessageIsOpen(true);
//   };

//   const handleSendSmsMass = async () => {
//     try {
//       await sendSmsMassFn({
//         destinationVariable: values.destinationVariable,
//         contactsListId: contactsListDetail.id,
//         message: formatMessageToBackEnd(values.message),
//       });

//       toast("success", "SMS em massa enviado com sucesso!");
//       setModalConfirmMessageIsOpen(false);
//     } catch (err) {
//       toast("error", "Algo deu errado.");
//     }
//   };

//   const contactsListDropdownOptions =
//     contactsListsItems?.map(({ name, id }) => {
//       return {
//         label: name,
//         value: id,
//       };
//     }) || [];

//   return <MassComunicationTemplate type="sms" />;
// };

export const MessagesTemplate = () => {
  return <MassCommunicationTemplate type={EMassCommunication.SMS} />;
};
