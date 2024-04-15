import {
  Breadcrumb,
  Dropdown,
  LayoutWithSidebar,
  Button,
  Input,
} from "@/components";
import { ROLE_OPTIONS, members } from "@/constants/contentMembers";
import { schemaEditMember } from "@/schemas/contacts";
import { toast } from "@/utils/toast";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";

interface IEditMember {
  name: string;
  email: string;
  role: string;
  password: string;
  id: string;
}

export const EditMemberTemplate = () => {
  const [memberDetail, setMemberDetail] = useState<IEditMember>();
  const { query } = useRouter();

  const handleEditMember = (values: IEditMember) => {
    alert("entrou");
    console.log(values);
    if (memberDetail) {
      toast("success", "membro editado com sucesso");
    }
  };

  const crumbs = [
    {
      label: "Membros",
      path: "/members",
    },
    {
      label: "Editar membro",
    },
  ];

  const getMemberDetail = () => {
    const member = members.find((member) => member.id === query.id);
    setMemberDetail(member);
    console.log(member);
  };

  useEffect(() => {
    getMemberDetail();
  }, [query.id]);

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: memberDetail?.name,
      email: memberDetail?.email,
      role: memberDetail?.role,
      password: memberDetail?.password,
      id: query.id,
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
          className=" !default-grey-label font-light "
          {...getFieldProps("name")}
          value={memberDetail?.name}
        />
        <Input
          label="E-mail"
          className=" !default-grey-label  font-light"
          {...getFieldProps("email")}
          value={memberDetail?.email}
        />
        <Dropdown
          label="Cargo"
          options={ROLE_OPTIONS}
          className=" !default-grey-label font-light mb-8"
          {...getFieldProps("role")}
          value={memberDetail?.role}
        />
        <Input
          label="Senha"
          className=" !default-grey-label font-light"
          {...getFieldProps("password")}
          value={memberDetail?.password}
        />
        <Button
          type="submit"
          className=" flex justify-center items-center gap-2 font-medium text-sm font-poppins !w-52 !h-10 mx-auto !mt-10"
          rightIcon={<CheckCircle size={16} />}
        >
          Confirmar Alteração
        </Button>
      </form>
    </LayoutWithSidebar>
  );
};
