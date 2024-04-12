import { Breadcrumb, LayoutWithSidebar } from "@/components";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { schemaCreateMember } from "@/schemas/contacts";
import { toast } from "@/utils/toast";
import { Formik } from "formik";
import { CheckCircle } from "phosphor-react";

interface ICreateMembers {
  name: string;
  email: string;
  cargo: string;
  senha: string;
}

export const CreateTemplate = () => {
  const initialValuesMembers = {
    name: "",
    email: "",
    cargo: "",
    senha: "",
  };

  const handleForm = (values: ICreateMembers, { resetForm }) => {
    console.log(values);
    toast("success", "membro adicionado com sucesso");
    resetForm();
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
  return (
    <Formik
      initialValues={initialValuesMembers}
      validationSchema={schemaCreateMember}
      onSubmit={handleForm}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => {
        return (
          <LayoutWithSidebar>
            <Breadcrumb crumbs={crumbs} />
            <form className="mt-6" onSubmit={handleSubmit}>
              <Input
                label="Nome"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                placeholder="Digite o nome"
                error={errors.name as string}
                className=" !default-grey-label font-light "
              />
              <Input
                label="E-mail"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="Digite o e-mail"
                onBlur={handleBlur("email")}
                error={errors.email as string}
                className=" !default-grey-label  font-light"
              />
              <Input
                label="Cargo"
                value={values.cargo}
                onChange={handleChange("cargo")}
                onBlur={handleBlur("cargo")}
                error={errors.cargo as string}
                placeholder="Digite o telefone"
                className=" !default-grey-label font-light"
              />
              <Input
                label="Senha"
                value={values.senha}
                onChange={handleChange("senha")}
                onBlur={handleBlur("senha")}
                error={errors.senha as string}
                placeholder="Digite a senha"
                className=" !default-grey-label font-light"
              />

              <Button
                type="submit"
                className=" flex justify-center items-center gap-2 font-medium text-sm font-poppins !w-40 !h-10 mx-auto !mt-10"
              >
                Criar <CheckCircle size={16} />
              </Button>
            </form>
          </LayoutWithSidebar>
        );
      }}
    </Formik>
  );
};
