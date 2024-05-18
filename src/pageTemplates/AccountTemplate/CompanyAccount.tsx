import { Button, Card, Dropdown, Input, Line, Paragraph } from "@/components";
import { COMPANY_TYPES } from "@/constants/contentCalls";
import { useCompany } from "@/hooks/useCompany";
import { validationSchemaAccountCompany } from "@/validation/account";
import { useFormik } from "formik";
import { CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export const CompanyAccount = () => {
  const { companyDetail } = useCompany();

  const {
    handleSubmit,
    getFieldProps,
    setValues,
    dirty,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: companyDetail?.name,
      email: companyDetail?.email,
      CNPJ: companyDetail?.CNPJ,
      address: {
        zipcode: companyDetail?.address?.zipcode,
      },
      type: companyDetail?.type,
    },
    validationSchema: validationSchemaAccountCompany,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (companyDetail) {
      setValues({
        name: companyDetail?.name,
        email: companyDetail?.email,
        CNPJ: companyDetail?.CNPJ,
        address: {
          zipcode: companyDetail.address.zipcode,
        },
        type: companyDetail?.type,
      });
    }
    console.log(companyDetail);
  }, [companyDetail, setValues]);

  return (
    <div className="mt-4">
      <Card>
        <Paragraph className="font-medium !text-base">
          Dados da empresa
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Edite os dados da sua empresa.
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
              CNPJ
            </Paragraph>
            <Input
              placeholder="CNPJ"
              className="max-w-[300px]"
              {...getFieldProps("CNPJ")}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
              CEP
            </Paragraph>
            <Input
              placeholder="CEP"
              className="max-w-[300px]"
              {...getFieldProps("address.zipcode")}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
              Tipo da empresa
            </Paragraph>
            <Dropdown
              className=" mb-4 max-w-[300px]"
              options={COMPANY_TYPES}
              placeholder="Tipo de empresa"
              value={values.type}
              onValueChange={(value) => setFieldValue("type", value)}
            />
          </div>
        </div>
        <Button
          className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
          rightIcon={<CheckCircle color="#FFF" size={20} />}
          disabled={!dirty}
        >
          Salvar alterações
        </Button>
      </Card>
    </div>
  );
};
