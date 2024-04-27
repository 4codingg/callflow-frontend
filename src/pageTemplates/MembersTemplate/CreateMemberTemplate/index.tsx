import { postCompanyMember } from "@/api/members/post-company-member";
import {
  Breadcrumb,
  Dropdown,
  LayoutWithSidebar,
  Button,
  Input,
} from "@/components";
import { SchemaEditMember, schemaCreateMember } from "@/schemas/members";
import { toast } from "@/utils/toast";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CheckCircle } from "phosphor-react";
import { useState } from "react";

export interface ICreateCompanyMemberProps {
  companyId: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}

export const CreateMemberTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleCreateMember = async (
    body: ICreateCompanyMemberProps,
    { resetForm }
  ) => {
    try {
      setIsLoading(true);
      const response = await postCompanyMember(body);
      console.log("Membro adicionado com sucesso:", response);
      toast("success", "Membro adicionado com sucesso");
      resetForm();
      router.push("/members");
    } catch (error) {
      console.error("Erro ao criar membro:", error);
      toast("error", "Erro ao criar membro");
      setIsLoading(false);
    }
  };

  const crumbs = [
    {
      label: "Membros",
      path: "/members",
    },
    {
      label: "Criar novo membro",
    },
  ];

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      companyId: "a32c91f5-2190-45f5-8cc6-3e3b3c59aa0b",
    },
    validationSchema: SchemaEditMember,
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
          {...getFieldProps("name")}
        />
        <Input
          label="E-mail"
          placeholder="Digite o e-mail"
          className=" font-light"
          {...getFieldProps("email")}
        />
        <Input
          label="Phone"
          placeholder="Digite a seu telefone"
          {...getFieldProps("phone")}
        />

        <Input
          label="Senha"
          placeholder="Digite a senha"
          className="font-light"
          {...getFieldProps("password")}
        />

        <Button
          type="submit"
          className=" flex justify-center items-center gap-2 font-medium text-sm font-poppins !w-40 !h-10 mx-auto !mt-10"
          rightIcon={<CheckCircle size={16} />}
          disabled={isLoading}
        >
          Criar
        </Button>
      </form>
    </LayoutWithSidebar>
  );
};
