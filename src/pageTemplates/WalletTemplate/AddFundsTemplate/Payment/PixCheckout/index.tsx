import { Line, Paragraph, ParagraphSizeVariant } from '@/components';
import QrCodeExample from '@/assets/qr-code-example.png';
import Image from 'next/image';
import { Copy, CornersOut, DeviceMobile, Phone } from 'phosphor-react';

export const PixCheckout = () => {
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
      <div className="mt-4 w-full bg-light-grey p-4 flex items-center justify-between">
        <Image src={QrCodeExample} alt="" />
        <div className="flex flex-col w-3/5 ">
          <div className="flex">
            <DeviceMobile color="#783EFD" size={20} />
            <Paragraph size={ParagraphSizeVariant.Large} className="ml-2">
              1. Abra o app do seu banco ou instituição financeira e entre no
              ambiente Pix
            </Paragraph>
          </div>
          <Line direction="horizontal" className="bg-[#00000020] my-4" />
          <div className="flex">
            <CornersOut color="#783EFD" size={20} />
            <Paragraph size={ParagraphSizeVariant.Large} className="ml-2">
              2. Escolha a opção pagar com QR Code e escaneie o código ao lado.
            </Paragraph>
          </div>
          <Line direction="horizontal" className="bg-[#00000020] my-4" />
          <div className="flex">
            <DeviceMobile color="#783EFD" size={20} />
            <Paragraph size={ParagraphSizeVariant.Large} className="ml-2">
              3. Confirme as informações e finalize a compra.
            </Paragraph>
          </div>
          <div className="mt-10 flex items-center py-4 px-10 justify-between bg-white">
            <Paragraph size={ParagraphSizeVariant.Large}>
              Chave do pix:
            </Paragraph>
            <Paragraph
              size={ParagraphSizeVariant.Large}
              className="text-primary"
            >
              0003331233331...
            </Paragraph>
            <button className="bg-none outline-none cursor-pointer items-center p-2 flex underline">
              <Copy className="mr-2" />
              Copiar Chave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
