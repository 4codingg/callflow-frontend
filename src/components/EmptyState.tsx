import Image from 'next/image';
import { PlusCircle } from 'phosphor-react';
import { Button } from './Button';
import { Paragraph } from './Paragraph';

export const EmptyState = ({ icon }) => {
  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col items-center gap-1 w-54">
        <Image src={icon} alt="icon-lista-vazia" />
        <Paragraph className=" font-bold text-lg">
          A lista está vazia{' '}
        </Paragraph>
        <Paragraph> Adicione um contato ou </Paragraph>
        <Paragraph>faça o upload de uma planilha </Paragraph>
        <Button
          className="font-light mt-6"
          leftIcon={<PlusCircle size={20} color="#FFF" />}
        >
          Adicionar lista
        </Button>
      </section>
    </div>
  );
};
