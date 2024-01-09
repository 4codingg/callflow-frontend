import { Heading, LayoutWithSidebar, Table } from '@/components';
import { MOCK_MEMBERS } from '@/constants/contentCalls';
import { useState } from 'react';

export const MembersTemplate = () => {
  const [members, setMembers] = useState(MOCK_MEMBERS);

  const handleEditItem = () => {};

  const handleDeleteItem = () => {};

  return (
    <LayoutWithSidebar>
      <Heading>Members</Heading>
      <div className="mt-4">
        <Table
          content={members}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
          disableAccessItem
        />
      </div>
    </LayoutWithSidebar>
  );
};
