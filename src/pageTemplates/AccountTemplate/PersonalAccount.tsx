import { Button, Card, Input, Line, Paragraph } from "@/components";
import { CheckCircle } from "phosphor-react";

export const PersonalAccount = () => {
  return (
    <div className="mt-4">
      <Card>
        <Paragraph className="font-medium !text-base">Dados da conta</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Edite os dados da sua conta pessoal.
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
              Telefone
            </Paragraph>
            <Input placeholder="Telefone" className="max-w-[300px]" />
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
