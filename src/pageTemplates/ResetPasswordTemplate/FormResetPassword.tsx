import { Button, Heading, Input, Paragraph } from "@/components";
import { validationSchemaResetPassword } from "@/validation/login";
import { useFormik } from "formik";
import { Envelope } from "phosphor-react";

export const FormResetPassword = ({ handleRequestResetPassword }) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaResetPassword,
    onSubmit: (values) => handleRequestResetPassword({ email: values.email }),
  });

  return (
    <>
      <Heading>Recuperar senha</Heading>
      <Paragraph className="text-sm text-default-grey !font-poppins">
        Insira seu e-mail abaixo para recuperar senha.
      </Paragraph>
      <form className="w-[400px] mt-6" onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Digite seu e-mail"
          type="text"
          label="E-mail"
          className=" !font-semibold px-4 py-[10px]"
          error={formik.errors?.email as string}
          {...formik.getFieldProps("email")}
          iconRight={<Envelope size={16} />}
        />

        <Button className="!rounded-md !font-poppins !font-medium mt-2">
          Enviar
        </Button>
      </form>
    </>
  );
};
