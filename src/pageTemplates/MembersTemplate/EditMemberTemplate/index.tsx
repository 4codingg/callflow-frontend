import { fetchCompanyMembers } from "@/api/members/fetch-company-members";
import { UpdateCompanyMembers } from "@/api/members/update-company-member-detail";
import {
  Breadcrumb,
  Dropdown,
  LayoutWithSidebar,
  Button,
  Input,
} from "@/components";
import { schemaEditMember, schemaEditMemberTste } from "@/schemas/members";
import { toast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CheckCircle } from "phosphor-react";
import { useEffect } from "react";

interface IUpdateCompanyMemberDetailBody {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  companyId?: string;
}

export const EditMemberTemplate = () => {
  const { query } = useRouter();

  const { data: membersList } = useQuery({
    queryKey: ["company-members"],
    queryFn: () => fetchCompanyMembers(),
    staleTime: Infinity,
  });

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
    const member = membersList.find((member) => member.id === query.id);
    setMemberDetail(member);
  };

  const handleEditMember = async (values: IUpdateCompanyMemberDetailBody) => {
    try {
      console.log("fui chamado");
      await UpdateCompanyMembers(query.id, values);
      toast("success", "Membro editado com sucesso");
    } catch (error) {
      toast("error", "Erro ao editar membro");
    }
  };
  const setMemberDetail = (member: IUpdateCompanyMemberDetailBody) => {
    setFieldValue("name", member?.name);
    setFieldValue("email", member?.email);
    setFieldValue("phone", member?.phone);
    setFieldValue("password", member?.password);
  };

  useEffect(() => {
    getMemberDetail();
  }, [query.id]);

  const { values, handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: schemaEditMemberTste,
    onSubmit: handleEditMember,
  });

  return (
    <LayoutWithSidebar>
      <Breadcrumb crumbs={crumbs} />
      <form className="mt-6" onSubmit={handleSubmit}>
        <Input
          label="Nome"
          className="font-normal "
          {...getFieldProps("name")}
        />
        <Input
          label="E-mail"
          className=" font-normal"
          {...getFieldProps("email")}
        />
        <Input
          label="Prone"
          className="font-normal"
          {...getFieldProps("phone")}
        />
        <Input
          label="Senha"
          className="font-normal"
          {...getFieldProps("password")}
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
