import { Card, Paragraph, ParagraphSizeVariant } from '@/components';
import Image from 'next/image';
import { Plus } from 'phosphor-react';
import CardCredit from '@/assets/card-credit.jpg';
import { useRouter } from 'next/router';

export const BalanceCardTemplate = () => {
  const router = useRouter();

  return (
    <Card className="flex flex-col w-full">
      <header className="flex justify-between items-center">
        <Paragraph className="!font-bold !text-lg">Seu Saldo</Paragraph>
        <button
          className="flex items-center justify-center bg-primary rounded p-2 shadow-primary"
          onClick={() => router.push('/wallet')}
        >
          <Plus color="#FFF" />
        </button>
      </header>
      <div className="flex items-center mt-4">
        <Paragraph
          className="text-primary mr-2 font-medium"
          size={ParagraphSizeVariant.ExtraLarge}
        >
          R$
        </Paragraph>
        <Paragraph>Reais</Paragraph>
      </div>
      <Paragraph className="text-primary !text-2xl font-bold">
        19.203,11
      </Paragraph>
      <Image src={CardCredit} alt="" className="mt-4 mx-auto flex" />
    </Card>
  );
};
