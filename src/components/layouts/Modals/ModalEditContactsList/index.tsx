import { updateContactsList } from '@/api/contactsList/update-contacts-list';
import { Button, ButtonVariant } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Input } from '@/components/Input';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { Spinner } from '@/components/Spinner';
import { useContactsList } from '@/hooks/useContactsListDetail';
import { queryClient } from '@/services/react-query';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { CheckCircle, X, XCircle } from 'phosphor-react';
import { useState } from 'react';

interface IModalEditContactsList {
  item: {
    name: string;
    id: string;
    phoneDestinationVariable: string;
    emailDestinationVariable: string;
    variables?: string[];
  };
}

export const ModalEditContactsList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    modalEditContactsListIsOpen,
    setModalEditContactsListIsOpen,
    contactsListDetail,
  } = useContactsList();

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
    const cache: IModalEditContactsList['item'] = queryClient.getQueryData([
      'contacts-list-detail',
    ]);

    if (cache) {
      queryClient.setQueryData(
        ['contacts-list-detail', contactsListDetail?.id],
        {
          ...cache,
          name,
        }
      );
    }

    return { cache };
  };

  const handleSave = async (values) => {
    setIsLoading(true);
    try {
      await updateContactsListFn({
        name: values.name,
        contactsListId: contactsListDetail?.id,
        phoneDestinationVariable: values.phoneDestinationVariable,
        emailDestinationVariable: values.emailDestinationVariable,
      });

      setModalEditContactsListIsOpen(false);
      toast('success', 'Dados atualizados com sucesso.');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { getFieldProps, handleSubmit, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: contactsListDetail?.name,
      phoneDestinationVariable: contactsListDetail?.phoneDestinationVariable,
      emailDestinationVariable: contactsListDetail?.emailDestinationVariable,
      variables: contactsListDetail?.variables,
    },
    onSubmit: handleSave,
  });


  return (
    <Modal.Root
      isOpen={modalEditContactsListIsOpen}
      setIsOpen={setModalEditContactsListIsOpen}
    >
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
          <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
            <Input
              className="!font-normal !text-black"
              label="Nome"
              {...getFieldProps('name')}
              disableError={true}
            />
            <div className="mt-4">
              <Dropdown
                options={contactsListDetail?.variables}
                label="Variável de destino para SMS/Ligações"
                onValueChange={(value) =>
                  setFieldValue('phoneDestinationVariable', value)
                }
                {...getFieldProps('phoneDestinationVariable')}
              />
            </div>
            <div className="mt-4">
              <Dropdown
                options={contactsListDetail?.variables}
                label="Variável de destino para E-mail"
                onValueChange={(value) =>
                  setFieldValue('emailDestinationVariable', value)
                }
                {...getFieldProps('emailDestinationVariable')}
              />
            </div>
            <section className="flex justify-end items-center gap-4 mt-[16px]">
              <Button
                leftIcon={<X size={24} />}
                type="button"
                className="!bg-grey-secundary !text-purple-secundary !w-2/6 !h-[48px] font-medium"
                onClick={() => setModalEditContactsListIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                leftIcon={<CheckCircle size={24} />}
                type="submit"
                className="!w-[109px] !h-[48px] font-medium"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Salvar'}
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
