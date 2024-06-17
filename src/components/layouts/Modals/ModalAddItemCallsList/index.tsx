import { Button, ButtonVariant } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { useCallsList } from '@/hooks/useCallsList';
import { schemaCallItem } from '@/schemas/calls';
import { formatPhone } from '@/utils/formatPhone';
import { Formik } from 'formik';
import { XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

interface IModalAddItemCallsList {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddItem: any;
}

export const ModalAddItemCallsList = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddItemCallsList) => {
  const { handleAddContactToCallsList } = useCallsList();

  const initialValuesAddItem = {
    name: '',
    email: '',
    phone: '',
  };

  const handleForm = (values: any) => {
    console.log(values);
    // handleAddContactToCallsList()
  };

  return (
    <Formik
      initialValues={initialValuesAddItem}
      validationSchema={schemaCallItem}
      onSubmit={handleForm}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
        return (
          <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
            <Modal.Content>
              <div className="bg-white px-4 py-8 min-w-[400px]">
                <header className="flex justify-between items-center w-full flex-1">
                  <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
                    Adicionar contato
                  </Paragraph>
                  <Modal.Close>
                    <Button variant={ButtonVariant.iconOnly} className="!w-6">
                      <XCircle size={24} />
                    </Button>
                  </Modal.Close>
                </header>
                <form className="mt-6" onSubmit={handleSubmit}>
                  <Input
                    label="Nome"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={errors.name as string}
                  />
                  <Input
                    label="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email as string}
                  />
                  <Input
                    label="Telefone"
                    value={formatPhone(values.phone)}
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')} 
                    error={errors.phone as string}
                    
                  />
                  <Button type="button">Adicionar</Button>
                </form>
              </div>
            </Modal.Content>
          </Modal.Root>
        );
      }}
    </Formik>
  );
};
