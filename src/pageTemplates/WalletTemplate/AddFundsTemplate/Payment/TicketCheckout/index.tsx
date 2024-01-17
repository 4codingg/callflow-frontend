import { Line, Paragraph, ParagraphSizeVariant } from '@/components';
import { Printer } from 'phosphor-react';
import { Button } from '@/components/Button';

export const TicketCheckout = () => {
  return (
    <div className="flex mt-6 flex-col">
      <Paragraph size={ParagraphSizeVariant.Large} className="font-bold">
        Dados de pagamento
      </Paragraph>
      <Paragraph size={ParagraphSizeVariant.Large}>
        Pedido efetuado através da forma de pagamento{' '}
        <span className="text-primary font-bold">Pix</span> no valor total de{' '}
        <span className="text-primary font-bold">R$ 656,00</span> à vista. Este
        pagamento pode ser efetuado até às 20:04 de hoje (1/16/2024).
      </Paragraph>
      <Line direction="horizontal" className="bg-[#00000020] my-8" />
      <div className="flex items-center gap-2">
        <Printer color="#783EFD" size={20} />
        <Paragraph>Imprima o boleto e pague no banco</Paragraph>
      </div>
      <div className="my-8 border-2 border-[#00000020] p-4 flex justify-between items-center">
        <Paragraph className="flex w-3/5">
          Disponível para retirada amanhã (17/01/2024) após a confirmação
        </Paragraph>
        <Button
          className="!w-[250px]"
          leftIcon={<Printer color="#fff" size={20} />}
        >
          Imprimir boleto
        </Button>
      </div>
    </div>
  );
};
