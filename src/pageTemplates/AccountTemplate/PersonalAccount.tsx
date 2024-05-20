import { Button, Card, Input, Line, Paragraph } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { validationSchemaAccountUser } from "@/validation/account";
import { useFormik } from "formik";
import { CheckCircle } from "phosphor-react";
import { useEffect } from "react";

export const PersonalAccount = () => {
  const { userDetail } = useAuth();

  const { handleSubmit, getFieldProps, setValues, dirty, setFieldValue } =
    useFormik({
      initialValues: {
        name: userDetail?.name || "",
        email: userDetail?.email || "",
        phone: userDetail?.phone || "",
      },
      validationSchema: validationSchemaAccountUser,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  useEffect(() => {
    if (userDetail) {
      setValues({
        name: userDetail.name,
        email: userDetail.email,
        phone: userDetail.phone,
      });
    }
  }, [userDetail, setValues]);

  return (
    <div className="mt-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <Paragraph className="font-medium !text-base">
            Dados da conta
          </Paragraph>
          <Paragraph className="!text-xs !text-default-grey">
            Edite os dados da sua conta pessoal.
          </Paragraph>
          <Line className="my-4" />
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
                Nome
              </Paragraph>
              <Input
                placeholder="Nome"
                className="max-w-[300px]"
                {...getFieldProps("name")}
              />
            </div>
            <div className="flex gap-4 items-center">
              <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
                E-mail
              </Paragraph>
              <Input
                placeholder="E-mail"
                className="max-w-[300px]"
                {...getFieldProps("email")}
              />
            </div>
            <div className="flex gap-4 items-center">
              <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
                Telefone
              </Paragraph>
              <Input
                placeholder="Telefone"
                className="max-w-[300px]"
                {...getFieldProps("phone")}
              />
            </div>
          </div>
          <Button
            className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
            rightIcon={<CheckCircle color="#FFF" size={20} />}
            type="submit"
            disabled={!dirty}
          >
            Salvar alterações
          </Button>
        </form>
      </Card>
    </div>
  );
};
