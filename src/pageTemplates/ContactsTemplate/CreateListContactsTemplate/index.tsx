import {
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
  Table,
} from '@/components';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { TableHeader } from '@/components/layouts/Headers/TableHeader';
import { MOCK_CONTACTS } from '@/constants/contentCalls';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  CaretUp,
  CheckCircle,
  DotsThreeOutlineVertical,
  PlusCircle,
  Upload,
} from 'phosphor-react';
import { Input } from 'postcss';

const crumbs = [
  {
    label: 'Contatos',
    path: '/contacts',
  },
  {
    label: 'Criar lista de Contatos',
  },
];

export const CreateListContactsTemplate = () => {
  return (
    <LayoutWithSidebar>
      <Breadcrumb crumbs={crumbs} />
      <div className="flex flex-col mt-6">
        <div className="flex items-center gap-4 w-full">
          <Button
            className="!w-[200px] !text-sm font-normal"
            leftIcon={<PlusCircle color="#FFF" size={20} />}
          >
            Adicionar contato
          </Button>
          <Button
            className="!w-[200px] !text-sm font-normal !bg-green "
            leftIcon={<Upload color="#FFF" size={20} />}
          >
            Upload de Planilha
          </Button>
        </div>
        <div>
          <Paragraph size={ParagraphSizeVariant.Large} className="flex mt-8">
            Aqui você pode criar sua lista de contatos.
          </Paragraph>
          <Paragraph size={ParagraphSizeVariant.Large}>
            Você pode criar adicionar o contato manualmente e/ou fazendo upload
            de um arquivo CSV.
          </Paragraph>
        </div>
      </div>
      <div className="mt-4">
        <Table
          content={MOCK_CONTACTS}
          headerComponent={<TableHeader title="Contatos" />}
        />
      </div>
      <Button
        leftIcon={<CheckCircle size={22} color="#FFF" />}
        className="mt-8 !w-[160px] mx-auto font-light flex"
      >
        Salvar lista
      </Button>
    </LayoutWithSidebar>
  );
};

CreateListContactsTemplate;
