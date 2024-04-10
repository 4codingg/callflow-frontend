import {
  Heading,
  HeadingSizeVariant,
  LayoutWithSidebar,
  Paragraph,
  TableDefault,
} from '@/components';
import { Button, ButtonSizeVariant } from '@/components/Button';
import { CONTENT_CALLS } from '@/constants/contentCalls';
import { useRouter } from 'next/router';
import { ListPlus } from 'phosphor-react';

export const CallsTemplate = () => {
  const router = useRouter();

  const handleAccessItem = (id: string) => {
    router.push('/calls/' + id);
  };

  return (
    <LayoutWithSidebar hiddenInput={true}>
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Heading size={HeadingSizeVariant.Medium}>Ligações</Heading>
          <Paragraph className="mt-2 text-default-grey">
            Desperte a eficiência em suas comunicações! Envie ligações em massa
            para seus contatos com facilidade e dinamicidade,
          </Paragraph>
          <Paragraph className="text-default-grey">
            elevando a maneira como você se conecta com seu público.
          </Paragraph>
        </div>
        <Button
          leftIcon={<ListPlus size={20} color="#FFF" />}
          size={ButtonSizeVariant.Small}
          onClick={() => router.push('/calls/create')}
        >
          Criar lista
        </Button>
      </header>
      <div className="mt-8 flex w-full">
        <TableDefault
          content={CONTENT_CALLS}
          handleAccessItem={handleAccessItem}
          disableEditItem
        />
      </div>
    </LayoutWithSidebar>
  );
};
