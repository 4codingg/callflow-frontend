import {
  Breadcrumb,
  Dropdown,
  LayoutWithSidebar,
  Button,
  Input,
} from '@/components';
import { ROLE_OPTIONS } from '@/constants/contentMembers';
import { schemaCreateMember } from '@/schemas/members';
import { toast } from '@/utils/toast';
import { useFormik } from 'formik';
import { CheckCircle } from 'phosphor-react';

interface ICreateMember {
  name: string;
  email: string;
  role: string;
  password: string;
}

export const CreateMemberTemplate = () => {
  const handleCreateMember = (values: ICreateMember, { resetForm }) => {
    console.log(values);
    toast('success', 'membro adicionado com sucesso');
    resetForm();
  };

  const crumbs = [
    {
      label: 'Membros',
      path: '/members',
    },
    {
      label: 'Criar novo membro',
    },
  ];

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema: schemaCreateMember,
    onSubmit: handleCreateMember,
  });

  return (
    <LayoutWithSidebar>
      <Breadcrumb crumbs={crumbs} />
      <form className="mt-6" onSubmit={handleSubmit}>
        <Input
          label="Nome"
          placeholder="Digite o nome"
          className="font-light "
          {...getFieldProps('name')}
        />
        <Input
          label="E-mail"
          placeholder="Digite o e-mail"
          className=" font-light"
          {...getFieldProps('email')}
        />
        <Dropdown
          label="Cargo"
          placeholder="Selecione o cargo"
          options={ROLE_OPTIONS}
          className="font-light mb-8"
          {...getFieldProps('role')}
        />
        <Input
          label="Senha"
          placeholder="Digite a senha"
          className="font-light"
          {...getFieldProps('password')}
        />

        <Button
          type="submit"
          className=" flex justify-center items-center gap-2 font-medium text-sm font-poppins !w-40 !h-10 mx-auto !mt-10"
          rightIcon={<CheckCircle size={16} />}
        >
          Criar
        </Button>
      </form>
    </LayoutWithSidebar>
  );
};
