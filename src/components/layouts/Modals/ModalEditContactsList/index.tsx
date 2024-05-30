import { updateContactsList } from "@/api/contactsList/update-contacts-list";
import { Button, ButtonVariant } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { Spinner } from "@/components/Spinner";
import { useCompany } from "@/hooks/useCompany";
import { queryClient } from "@/services/react-query";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

interface IModalEditNameContactsList {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  item: {
    name: string;
    id: string;
    phoneDestinationVariable: string;
    emailDestinationVariable: string;
    variables?: string[];
  };
}

export const ModalEditContactsList = ({
  setModalIsOpen,
  modalIsOpen,
  item,
}: IModalEditNameContactsList) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: updateContactsListFn } = useMutation({
    mutationFn: updateContactsList,
    onMutate({ name }) {
      const { cache } = updateContactsListCache({ name });

      return { previousContactsList: cache };
    },
    onError(_, __, context) {
      if (context?.previousContactsList) {
        updateContactsListCache(context?.previousContactsList);
      }
    },
  });

  const updateContactsListCache = ({ name }) => {
    const cache: IModalEditNameContactsList["item"] = queryClient.getQueryData([
      "contacts-list-detail",
    ]);

    if (cache) {
      queryClient.setQueryData(["contacts-list-detail", item?.id], {
        ...cache,
        name,
      });
    }

    return { cache };
  };

  const handleSave = async (values) => {
    setIsLoading(true);
    try {
      await updateContactsListFn({
        name: values.name,
        contactsListId: item.id,
      });

      setModalIsOpen(false);
      toast("success", "Nome atualizado com sucesso.");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { getFieldProps, handleSubmit, values, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item?.name,
      phoneDestinationVariable: item?.phoneDestinationVariable,
      emailDestinationVariable: item?.emailDestinationVariable,
      variables: item?.variables,
    },
    onSubmit: handleSave,
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
              Editar dados da lista
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-3" />
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              className="!font-normal !text-black"
              label="Nome"
              {...getFieldProps("name")}
            />
            <Dropdown
              options={item.variables}
              label="Variável de destino para SMS/Ligações"
              placeholder=""
              onValueChange={(value) =>
                setFieldValue("phoneDestinationVariable", value)
              }
              {...getFieldProps("phoneDestinationVariable")}
            />

            <Dropdown
              options={item.variables}
              label="Variável de destino para E-mail"
              placeholder=""
              onValueChange={(value) =>
                setFieldValue("emailDestinationVariable", value)
              }
              {...getFieldProps("emailDestinationVariable")}
            />

            <section className="flex justify-end items-center gap-4 mt-[16px]">
              <Button
                leftIcon={<X size={24} />}
                type="button"
                className="!bg-grey-secundary !text-purple-secundary !w-2/6 !h-[48px] font-medium"
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                leftIcon={<CheckCircle size={24} />}
                type="submit"
                className="!w-[109px] !h-[48px] font-medium"
                disabled={isLoading}
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
