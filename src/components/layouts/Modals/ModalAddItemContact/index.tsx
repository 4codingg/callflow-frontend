import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { useCallsList } from "@/hooks/useCallsList";
import { schemaCallItem } from "@/schemas/calls";
import { schemaContactItem } from "@/schemas/contacts";
import { Formik } from "formik";
import { validateConfig } from "next/dist/server/config-shared";
import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IModalAddItemContactList {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddItem: any;
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
}: IModalAddItemContactList) => {
  const { handleAddContactToCallsList } = useCallsList();

  const initialValuesAddItem = {
    name: "",
    email: "",
    phone: "",
  };

  const handleForm = (values: IAddContacts, { resetForm }) => {
    console.log("nome:", values.name);
    console.log("email:", values.email);
    console.log("telefone:", values.phone);
    handleAddContactToCallsList(values);
    setModalIsOpen(false);
    resetForm();
  };

  const handleDescartChange = (resetForm) => {
    setModalIsOpen(false);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValuesAddItem}
      validationSchema={schemaContactItem}
      onSubmit={handleForm}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => {
        return (
          <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
            <Modal.Content>
              <div className="bg-white p-4 min-w-[400px]">
                <header className="flex justify-between items-center w-full flex-1">
                  <Paragraph
                    size={ParagraphSizeVariant.Medium}
                    className=" text-purple-secundary !font-mediumm"
                  >
                    Adicionar contato
                  </Paragraph>
                  <Modal.Close>
                    <Button
                      variant={ButtonVariant.iconOnly}
                      className="!w-6 !h-6"
                    >
                      <XCircle size={24} color="#7F7F7F" />
                    </Button>
                  </Modal.Close>
                </header>
                <Line direction="horizontal" className="mt-4" />
                <form className="mt-6" onSubmit={handleSubmit}>
                  <Input
                    label="Nome"
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={errors.name as string}
                    labelStyle=" text-grey-label font-semibold"
                    className=" !text-grey-label font-light "
                  />
                  <Input
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email as string}
                    labelStyle=" text-grey-label font-semibold"
                    className=" !text-grey-label  font-light"
                  />
                  <Input
                    label="Telefone"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    error={errors.phone as string}
                    labelStyle=" text-grey-label font-semibold"
                    className=" !text-grey-label  font-light"
                  />
                  <section className="flex justify-end items-center gap-4 mt-[16px]">
                    <Button
                      leftIcon={<X size={24} />}
                      type="button"
                      className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
                      onClick={() => handleDescartChange(resetForm)}
                    >
                      Descartar Alterações
                    </Button>
                    <Button
                      leftIcon={<CheckCircle size={24} />}
                      type="submit"
                      className="!w-[109px] !h-[48px] font-medium"
                    >
                      Salvar
                    </Button>
                  </section>
                </form>
              </div>
            </Modal.Content>
          </Modal.Root>
        );
      }}
    </Formik>
  );
};
