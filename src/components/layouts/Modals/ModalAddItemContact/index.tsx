import { GetContactsListDetailResponse } from "@/api/contactsList/get-contacts-list-detail";
import { updateContactsList } from "@/api/contactsList/update-contacts-list";
import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { convertCamelCaseToWordsAndTranslate } from "@/utils/convertCamelCaseToWords";
import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, X, XCircle } from "phosphor-react";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { Spinner } from "@/components/Spinner";

interface IModalAddItemContactList {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  contactsListDetail: GetContactsListDetailResponse;
}

interface IAddContacts {
  name: string;
  email: string;
  phone: string;
  id: string | number;
}

export const ModalAddItemContactList = ({
  setModalIsOpen,
  modalIsOpen,
  contactsListDetail,
}: IModalAddItemContactList) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateContactsListFn } = useMutation({
    mutationFn: updateContactsList,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["contacts-list-detail", contactsListDetail.id],
      });
    },
  });

  const handleForm = async (values: IAddContacts, { resetForm }) => {
    setIsLoading(true);
    try {
      await updateContactsListFn({
        contactsListId: contactsListDetail.id,
        contacts: [values],
      });
      resetForm();
      toast("success", "Contato adicionado com sucesso.");
    } catch (err) {
      toast("error", "Algo deu errado.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialValues = () => {
    const initialValues = {};
    contactsListDetail?.variables?.map((variable) => {
      initialValues[variable] = "";
    });
    return initialValues;
  };

  const { getFieldProps, handleSubmit, resetForm } = useFormik({
    initialValues: getInitialValues(),
    onSubmit: handleForm,
    enableReinitialize: true,
  });

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[400px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Adicionar contato
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <form className="mt-6" onSubmit={handleSubmit}>
            {contactsListDetail?.variables?.map((variable) => {
              return (
                <Input
                  label={convertCamelCaseToWordsAndTranslate(variable)}
                  placeholder={`Digite o valor para ${convertCamelCaseToWordsAndTranslate(
                    variable
                  )}`}
                  className=" !default-grey-label font-light "
                  {...getFieldProps(variable)}
                />
              );
            })}
            <section className="flex justify-end items-center gap-4 mt-[16px]">
              <Button
                leftIcon={<X size={24} />}
                type="button"
                className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
                onClick={() => {
                  resetForm();
                  setModalIsOpen(false);
                }}
              >
                Descartar alterações
              </Button>
              <Button
                disabled={isLoading}
                leftIcon={<CheckCircle size={24} />}
                type="submit"
                className="!w-[109px] !h-[48px] font-medium"
              >
                {isLoading ? <Spinner /> : "Salvar"}
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
