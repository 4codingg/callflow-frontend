import {
  Breadcrumb,
  Dropdown,
  LayoutWithSidebar,
  Button,
  Input,
} from '@/components';
import { ROLE_OPTIONS, MOCK_MEMBERS } from '@/constants/contentMembers';
import { schemaEditMember } from '@/schemas/contacts';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { CheckCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';

interface IEditMember {
  name: string;
  email: string;
  role: string;
  password: string;
  id?: string;
}

export const EditMemberTemplate = () => {
  const { query } = useRouter();

  const handleEditMember = (values: IEditMember) => {
    console.log(values);
  };

  const crumbs = [
    {
      label: 'Membros',
      path: '/members',
    },
    {
      label: 'Editar membro',
    },
  ];

  const getMemberDetail = () => {
    const member = MOCK_MEMBERS.find((member) => member.id === query.id);
    setMemberDetail(member);
  };

  const setMemberDetail = (member: IEditMember) => {
    setFieldValue('name', member?.name);
    setFieldValue('email', member?.email);
    setFieldValue('role', member?.role);
    setFieldValue('password', member?.password);
  };

  useEffect(() => {
    getMemberDetail();
  }, [query.id]);

  const { values, handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema: schemaEditMember,
    onSubmit: handleEditMember,
  });

  return (
    <LayoutWithSidebar>
      <Breadcrumb crumbs={crumbs} />
      <form className="mt-6" onSubmit={handleSubmit}>
        <Input
          label="Nome"
          className="font-normal "
          {...getFieldProps('name')}
        />
        <Input
          label="E-mail"
          className=" font-normal"
          {...getFieldProps('email')}
        />
        <Dropdown
          label="Cargo"
          options={ROLE_OPTIONS}
          className="font-normal mb-8"
          onValueChange={(value) => setFieldValue('role', value)}
          {...getFieldProps('role')}
        />
        <Input
          label="Senha"
          className="font-normal"
          {...getFieldProps('password')}
        />
        <Button
          type="submit"
          className=" flex justify-center items-center gap-2 font-medium text-sm font-poppins !w-52 !h-10 mx-auto !mt-10"
          rightIcon={<CheckCircle size={16} />}
        >
          Salvar alterações
        </Button>
      </form>
    </LayoutWithSidebar>
  );
};
