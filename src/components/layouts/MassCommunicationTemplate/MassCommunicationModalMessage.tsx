import { GetContactsListDetailResponse } from "@/api/contactsList/get-contacts-list-detail";
import { EMassCommunication } from "@/constants/massCommunication";
import { Dispatch, SetStateAction } from "react";
import { ModalCalls } from "../Modals/ModalCalls";
import { ModalEmail } from "../Modals/ModalEmail";
import { ModalMessage } from "../Modals/ModalMessage";

interface IMassCommunicationModalMessageProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  contactsListDetail: GetContactsListDetailResponse;
  setMessage: Dispatch<SetStateAction<string>>;
  setSubject: Dispatch<SetStateAction<string>>;
  message: string;
  type: EMassCommunication;
}

export const MassCommunicationModalMessage = ({
  modalIsOpen,
  setModalIsOpen,
  contactsListDetail,
  setMessage,
  setSubject,
  message,
  type,
}: IMassCommunicationModalMessageProps) => {
  return (
    <>
      {type === EMassCommunication.SMS && (
        <ModalMessage
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          variables={contactsListDetail?.variables}
          exampleItem={
            !!contactsListDetail?.contacts?.length &&
            contactsListDetail?.contacts[0]
          }
          message={message}
          setMessage={setMessage}
        />
      )}
      {type === EMassCommunication.Call && (
        <ModalCalls
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          variables={contactsListDetail?.variables}
          exampleItem={
            !!contactsListDetail?.contacts?.length &&
            contactsListDetail?.contacts[0]
          }
          message={message}
          setMessage={setMessage}
        />
      )}
      {type === EMassCommunication.Email && (
        <ModalEmail
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          variables={contactsListDetail?.variables}
          exampleItem={
            !!contactsListDetail?.contacts?.length &&
            contactsListDetail?.contacts[0]
          }
          message={message}
          setMessage={setMessage}
          setSubject={setSubject}
        />
      )}
    </>
  );
};
