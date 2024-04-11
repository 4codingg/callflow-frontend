import { LayoutWithSidebar, Breadcrumb, Button } from '@/components';
import { ArrowRight, Warning } from 'phosphor-react';
import { useState } from 'react';
import { Tipbox } from '@/components/Tipbox';
import { useAuth } from '@/hooks/useAuth';
import { IPlanSubscriptionValue } from '@/@types/Subscription';
import { Input } from '@/components/Input';
import { useRouter } from 'next/router';
import { ModalConfirmVariables } from '@/components/layouts/Modals/ModalConfirmVariables';
import { useMutation } from '@tanstack/react-query';
import { createContactsList } from '@/api/contactsList/create-contacts-list';
import { useFormik } from 'formik';
import { Labelbox } from '@/components/Labelbox';
import { toast } from '@/utils/toast';

const crumbs = [
  {
    label: 'Lista de Contatos',
    path: '/contacts',
  },
  {
    label: 'Criar lista de contatos',
  },
];

export const CreateContactListTemplate = () => {
  const [modalConfirmVariablesIsOpen, setModalConfirmVariablesIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { plan } = useAuth();
  const router = useRouter();

  const { mutateAsync: createContactsListFn, isPending } = useMutation({
    mutationFn: createContactsList,
  });

  const handleConfirmCreateContactsList = async () => {
    if (
      plan.value !== IPlanSubscriptionValue.Free &&
      !modalConfirmVariablesIsOpen
    ) {
      setModalConfirmVariablesIsOpen(true);
      return;
    }

    setIsLoading(true);
    const { id } = await createContactsListFn({
      name: values.name,
      variables: values.variables,
    });

    toast('success', 'Lista criada com sucesso!');
    router.push(`/contacts/${id}`);
    setIsLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (
        values.inputVariableValue.trim() !== '' &&
        !values.variables.includes(values.inputVariableValue)
      ) {
        setFieldValue('variables', [
          ...values.variables,
          values.inputVariableValue,
        ]);
      }
      setFieldValue('inputVariableValue', '');
    }
  };

  const handleDeleteVariable = (itemToDelete: string) => {
    if (
      itemToDelete === 'Nome' ||
      itemToDelete === 'Email' ||
      itemToDelete === 'Telefone'
    ) {
      return;
    }
    const updatedVariables = values.variables.filter(
      (item) => item !== itemToDelete
    );
    setFieldValue('variables', updatedVariables);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setFieldValue('inputVariableValue', event.target.value);
    }
  };

  const { values, setFieldValue, getFieldProps } = useFormik({
    isInitialValid: false,
    enableReinitialize: true,
    initialValues: {
      name: '',
      inputVariableValue: '',
      variables:
        plan.value === IPlanSubscriptionValue.Free
          ? ['name', 'email', 'phone']
          : [],
    },
    onSubmit: handleConfirmCreateContactsList,
  });

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        {plan.value === IPlanSubscriptionValue.Free && (
          <Tipbox
            iconLeft={<Warning size={20} />}
            buttonRight={
              <Button
                className="!w-56 font-medium !text-sm"
                rightIcon={<ArrowRight color="#FFF" />}
              >
                Fazer upgrade
              </Button>
            }
          >
            Seu plano gratuito tem acesso apenas a lista padrão com 3 variavéis
            (nome, e-mail e telefone)
          </Tipbox>
        )}
        <section className="mt-5">
          <Input
            label="Nome da lista"
            placeholder="Dê um nome pra sua lista"
            {...getFieldProps('name')}
          />
          <Input
            label="Variáveis"
            placeholder="Acione as variáveis da sua lista"
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            value={values.inputVariableValue}
            disabled={plan.value === IPlanSubscriptionValue.Free}
          />
          <section className="flex gap-4">
            {values.variables.map((item, index) => (
              <Labelbox
                key={index}
                action={handleDeleteVariable}
                label={item}
              />
            ))}
          </section>
          <Button
            onClick={handleConfirmCreateContactsList}
            className=" mt-2 m-auto !w-48 font-poppins font-medium text-sm gap-2"
          >
            Avançar
            <ArrowRight size={19} color="#fff" />
          </Button>
        </section>
      </LayoutWithSidebar>
      <ModalConfirmVariables
        modalIsOpen={modalConfirmVariablesIsOpen}
        setModalIsOpen={setModalConfirmVariablesIsOpen}
        variables={values.variables}
        handleConfirmVariables={handleConfirmCreateContactsList}
        isLoading={isLoading || isPending}
      />
    </>
  );
};
