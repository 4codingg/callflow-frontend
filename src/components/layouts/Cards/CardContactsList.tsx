import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Paragraph } from "@/components/Paragraph";
import { ReactNode } from "react";
import cardIcon from "../../../assets/icons/cardIcon.svg";
import icon from "@/assets/icons/cardVazio.png";
import Image from "next/image";
import { PlusCircle } from "phosphor-react";

interface ICardCallListProps {
  children: ReactNode;
  content: ContentProps[];
}

interface ContentProps {
  id: number;
  name: string;
  quantity: number;
  lastPlay: string;
}

export const CardContactsList = ({ children, content }: ICardCallListProps) => {
  if (content.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center gap-1 w-54">
          <Image src={icon} alt="icon-lista-vazia" />
          <Paragraph className=" font-bold text-lg">
            {" "}
            A lista está vazia{" "}
          </Paragraph>
          <Paragraph> Adicione um contato ou </Paragraph>
          <Paragraph>faça o upload de uma planilha </Paragraph>
          <Button
            className="font-light mt-6"
            leftIcon={<PlusCircle size={20} color="#FFF" />}
          >
            {" "}
            Adicionar lista
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {content.map((item) => (
        <div key={item.id}>
          <Card className="flex flex-col items-center gap-3 w-72 h-72 p-14">
            <Image src={cardIcon} alt="icon-Card" width={24} height={24} />
            <h1>{item.name}</h1>
            <Paragraph>{item.lastPlay}</Paragraph>
            <Paragraph className="text-primary">
              {item.quantity} contatos
            </Paragraph>
            <Button
              className="h-8 rounded-lg font-light"
              style={{ width: 108, height: 32 }}
            >
              Acessar
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};
