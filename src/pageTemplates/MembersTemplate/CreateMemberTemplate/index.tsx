import { createCompanyMember } from "@/api/members/create-company-member";
import { Breadcrumb, LayoutWithSidebar, Button, Input } from "@/components";
import { useCompany } from "@/hooks/useCompany";
import { useGlobaLoading } from "@/hooks/useGlobalLoading";
import { schemaCreateMember } from "@/schemas/members";
import { formatPhone } from "@/utils/formatPhone";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
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
  const { companyDetail } = useCompany();

  const { mutateAsync: createCompanyMemberFn } = useMutation({
    mutationFn: createCompanyMember,
  });

  const { setGlobalLoading } = useGlobaLoading();

  const handleCreateMember = async (body: ICreateCompanyMemberProps) => {
    setGlobalLoading(true);
    try {
      setIsLoading(true);
      await createCompanyMemberFn({
        ...body,
        companyId: companyDetail.id,
      });

      toast("success", "Membro adicionado com sucesso");
      router.push("/members");
    } catch (error) {
      toast("error", "Erro ao criar membro.");
      setIsLoading(false);
    } finally {
      setGlobalLoading(false);
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

  const { handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      companyId: "",
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
          {...getFieldProps("name")}
        />
        <Input
          label="E-mail"
          placeholder="Digite o e-mail"
          className=" font-light"
          {...getFieldProps("email")}
        />
        <Input
          label="Telefone"
          placeholder="Digite a seu telefone"
          {...getFieldProps("phone")}
          onChange={(e) => setFieldValue("phone", formatPhone(e.target.value))}
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
