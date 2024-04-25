import {
  Button,
  Heading,
  HeadingSizeVariant,
  LayoutWithSidebar,
  Paragraph,
} from "@/components";
import {
  AnaliseRelatorio,
  LIMITE_EMAILS,
  LIMITE_LIGACOES,
  LIMITE_SMS,
  ListaContatosPersonalizada,
  SuporteEmailWhats,
  SuporteMeet,
} from "@/constants/plans";

import Image from "next/image";

export const PlansTemplate = () => {
  return (
    <LayoutWithSidebar>
      <header className="grid grid-cols-4 gap-5 text-center h-[190px] ">
        <section className="col-span-1 ">
          <Heading className="!text-start">Planos</Heading>
          <Paragraph className=" !text-start mt-4 font-medium text-[#858BA0] text-xs max-w-[206px]">
            Escolha seu plano de acordo com seu planejamento de uso
          </Paragraph>
        </section>
        <section className="col-span-1 gap-7">
          <Heading size={HeadingSizeVariant.ExtraLarge}>Grátis</Heading>
          <Button className="h-[51px] w-56 mt-7 m-auto">
            Escolher esse Plano
          </Button>
        </section>
        <section className="col-span-1 gap-7">
          <Heading size={HeadingSizeVariant.ExtraLarge}>
            R$ 21,99
            <span className="text-[#858BA0] font-medium text-sm "> /mês</span>
          </Heading>
          <Button className="h-[51px] w-56 mt-7 m-auto">
            Escolher esse Plano
          </Button>
        </section>
        <section className="col-span-1 gap-7 ">
          <Heading size={HeadingSizeVariant.ExtraLarge}>
            R$ 44,99
            <span className="text-[#858BA0] font-medium text-sm "> /mês</span>
          </Heading>
          <Button className="h-[51px] w-56 mt-7 m-auto">
            Escolher esse Plano
          </Button>
        </section>
      </header>
      <div>
        {LIMITE_SMS.map((item, index) => (
          <section
            className="grid grid-cols-4 gap-5 text-center h-[80px]"
            key={index}
          >
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.free}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.plus}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.premium}
            </Paragraph>
          </section>
        ))}
      </div>
      <div>
        {LIMITE_LIGACOES.map((item, index) => (
          <section
            className="grid grid-cols-4 gap-5 text-center h-[80px]"
            key={index}
          >
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.free}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.plus}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.premium}
            </Paragraph>
          </section>
        ))}
      </div>
      <div>
        {LIMITE_EMAILS.map((item, index) => (
          <section
            className="grid grid-cols-4 gap-5 text-center h-[80px]"
            key={index}
          >
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.free}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.plus}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.premium}
            </Paragraph>
          </section>
        ))}
      </div>
      <div>
        {SuporteEmailWhats.map((item, index) => (
          <section className="grid grid-cols-4 gap-5 h-[80px]" key={index}>
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>

            <Image
              className="mx-auto"
              alt=""
              src={item.values.free}
              width={20}
              height={20}
            />

            <Image
              className="mx-auto"
              alt=""
              src={item.values.plus}
              width={20}
              height={20}
            />

            <Image
              className="mx-auto"
              alt=""
              src={item.values.premium}
              width={20}
              height={20}
            />
          </section>
        ))}
      </div>
      <div>
        {SuporteMeet.map((item, index) => (
          <section className="grid grid-cols-4 gap-5 h-[80px]" key={index}>
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>

            <Paragraph className="font-medium text-sm">
              {item.values.free}
            </Paragraph>
            <Paragraph className="font-medium text-sm">
              {item.values.plus}
            </Paragraph>

            <Image
              className="mx-auto"
              alt=""
              src={item.values.premium}
              width={20}
              height={20}
            />
          </section>
        ))}
      </div>
      <div>
        {ListaContatosPersonalizada.map((item, index) => (
          <section
            className="grid grid-cols-4 text-center gap-5 h-[80px]"
            key={index}
          >
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>
            <Paragraph className="font-medium text-sm mx-auto max-w-[194px]">
              {item.values.free}
              <span className="font-medium text-[#858BA0] text-xs block">
                (nome, e-mail e telefone)
              </span>
            </Paragraph>
            <Image
              className="mx-auto"
              alt=""
              src={item.values.plus}
              width={20}
              height={20}
            />
            <Image
              className="mx-auto"
              alt=""
              src={item.values.premium}
              width={20}
              height={20}
            />
          </section>
        ))}
      </div>
      <div>
        {AnaliseRelatorio.map((item, index) => (
          <section className="grid grid-cols-4 gap-5 h-[80px]" key={index}>
            <Paragraph className="!text-start font-medium text-sm">
              {item.label}
            </Paragraph>

            <Paragraph className="font-medium text-sm">
              {item.values.free}
            </Paragraph>
            <Image
              className="mx-auto"
              alt=""
              src={item.values.plus}
              width={20}
              height={20}
            />
            <Image
              className="mx-auto"
              alt=""
              src={item.values.premium}
              width={20}
              height={20}
            />
          </section>
        ))}
      </div>
    </LayoutWithSidebar>
  );
};
