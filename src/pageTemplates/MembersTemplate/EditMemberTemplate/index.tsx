import { getCompanyMember } from "@/api/members/get-company-member";
import { updateCompanyMemberDetail } from "@/api/members/update-company-member-detail";
import {
  Breadcrumb,
  LayoutWithSidebar,
  Button,
  Input,
  Spinner,
} from "@/components";
import { SchemaEditMember } from "@/schemas/members";
import { toast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";

interface IUpdateCompanyMemberDetailBody {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  companyId?: string;
}

export const EditMemberTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const currentMemberId = query.id as string;

  const { data: memberDetail, isPending } = useQuery({
    queryKey: ["company-member-detail", currentMemberId],
    queryFn: () => getCompanyMember(currentMemberId),
  });

  const { mutateAsync: updateCompanyMemberDetailFn } = useMutation({
    mutationFn: updateCompanyMemberDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-member-detail", currentMemberId],
      });
    },
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

  useEffect(() => {
    setMemberDetail(memberDetail);
  }, [currentMemberId, memberDetail?.id]);

  const handleEditMember = async (values: IUpdateCompanyMemberDetailBody) => {
    setIsLoading(true);
    try {
      await updateCompanyMemberDetailFn({
        memberId: currentMemberId,
        body: values,
      });
      toast("success", "Membro editado com sucesso");
    } catch (error) {
      toast("error", "Erro ao editar membro");
    } finally {
      setIsLoading(false);
    }
  };

  const setMemberDetail = (member: IUpdateCompanyMemberDetailBody) => {
    setFieldValue("name", member?.name);
    setFieldValue("email", member?.email);
    setFieldValue("phone", member?.phone);
    setFieldValue("password", member?.password);
  };

  const { handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: SchemaEditMember,
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
          label="Phone"
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
          disabled={isLoading || isPending}
        >
          {isLoading || isPending ? <Spinner /> : "Salvar alterações"}
        </Button>
      </form>
    </LayoutWithSidebar>
  );
};
