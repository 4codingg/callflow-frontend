import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { schemaCallItem } from "@/schemas/calls";
import { Formik } from "formik";
import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IModalEditItemCallsList {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  item: any;
}

export const ModalEditNameContactList = ({
  setModalIsOpen,
  modalIsOpen,
  item,
}: IModalEditItemCallsList) => {
  const initialValuesEditItem = {
    name: item?.name || "",
    email: item?.email || "",
    phone: item?.phone || "",
  };

  return (
    <Formik
      initialValues={initialValuesEditItem}
      validationSchema={schemaCallItem}
      onSubmit={() => {}}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
        return (
          <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
            <Modal.Content>
              <div className="bg-white px-4 py-8 min-w-[400px]">
                <header className="flex justify-between items-center w-full flex-1">
                  <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
                    Editar nome da Lista
                  </Paragraph>
                  <Modal.Close>
                    <Button variant={ButtonVariant.iconOnly} className="!w-6">
                      <XCircle size={24} />
                    </Button>
                  </Modal.Close>
                </header>
                <Line direction="horizontal" className="mt-3" />
                <form className="mt-6" onSubmit={handleSubmit}>
                  <Input
                    label="Nome"
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={errors.name as string}
                  />
                  <section className="flex justify-end items-center gap-4 mt-[16px]">
                    <Button
                      leftIcon={<X size={24} />}
                      type="button"
                      className="!bg-grey-secundary !text-purple-secundary !w-2/6 !h-[48px] font-medium"
                    >
                      Cancelar
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
