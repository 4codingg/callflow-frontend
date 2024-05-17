import { Button, Card, Dropdown, Input, Line, Paragraph } from "@/components";
import { COMPANY_TYPES } from "@/constants/contentCalls";
import { CheckCircle } from "phosphor-react";

export const CompanyAccount = () => {
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
            <Input placeholder="Nome" className="max-w-[300px]" />
          </div>
          <div className="flex gap-4 items-center">
            <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
              E-mail
            </Paragraph>
            <Input placeholder="E-mail" className="max-w-[300px]" />
          </div>
          <div className="flex gap-4 items-center">
            <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
              CNPJ
            </Paragraph>
            <Input placeholder="CNPJ" className="max-w-[300px]" />
          </div>
          <div className="flex gap-4 items-center">
            <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
              CEP
            </Paragraph>
            <Input placeholder="CEP" className="max-w-[300px]" />
          </div>
          <div className="flex gap-4 items-center">
            <Paragraph className="!text-sm whitespace-nowrap min-w-[150px]">
              Tipo da empresa
            </Paragraph>
            <Dropdown
              className=" mb-4 max-w-[300px]"
              options={COMPANY_TYPES}
              placeholder="Tipo de empresa"
            />
          </div>
        </div>
        <Button
          className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
          rightIcon={<CheckCircle color="#FFF" size={20} />}
        >
          Salvar alterações
        </Button>
      </Card>
    </div>
  );
};
