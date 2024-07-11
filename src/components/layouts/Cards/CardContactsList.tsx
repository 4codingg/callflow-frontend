import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Paragraph } from '@/components/Paragraph';
import cardIcon from '@/assets/icons/cardIcon.svg';
import Image from 'next/image';

interface ICardCallListProps {
  content: ContentProps[];
}

interface ContentProps {
  id: number;
  name: string;
  quantity: number;
  lastPlay: string;
}

export const CardContactsList = ({ content }: ICardCallListProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {content.map((item) => (
        <div key={item.id}>
          <Card className="flex flex-col items-center py-6 px-20 gap-3 transition-all">
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
