import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Paragraph } from "@/components/Paragraph";
import { Users } from "phosphor-react";
import { ReactNode } from "react";

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

export const CardCallsList = ({ children, content }: ICardCallListProps) => {
  return (
    <div className="flex gap-4">
      {content.map((item) => (
        <div key={item.id}>
          <Card className=" flex flex-col items-center gap-3 w-80 h-72 p-14">
            <Users size={32} />
            <h1>{item.name}</h1>
            <Paragraph>{item.lastPlay}</Paragraph>
            <Paragraph className="text-primary">
              {" "}
              {item.quantity} contatos
            </Paragraph>
            <Button className=" w-20 px-2 h-8 rounded-lg font-normal">
              Acessar
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};
