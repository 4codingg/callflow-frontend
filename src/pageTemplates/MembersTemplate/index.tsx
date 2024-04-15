import {
  Button,
  Heading,
  LayoutWithSidebar,
  Paragraph,
  TableDefault,
} from '@/components';
import { MOCK_MEMBERS } from '@/constants/contentCalls';
import { useRouter } from 'next/router';
import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';

export const MembersTemplate = () => {
  const [members, setMembers] = useState(MOCK_MEMBERS);

  const handleEditItem = () => {};

  const handleDeleteItem = () => {};

  const router = useRouter();

  return (
    <LayoutWithSidebar>
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <Heading>Members</Heading>
          <Paragraph className="!text-default-grey">
            Adicione membros para compor seu time.
          </Paragraph>
        </div>
        <Button
          className="!w-[160px] !h-[40px] font-light text-xs"
          leftIcon={<PlusCircle size={16} color="#FFF" />}
          onClick={() => router.push('/members/create')}
        >
          Adicionar membro
        </Button>
      </header>
      <div className="mt-4">
        <TableDefault
          content={members}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
          disableAccessItem
        />
      </div>
    </LayoutWithSidebar>
  );
};
