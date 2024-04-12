import {
  Heading,
  LayoutWithSidebar,
  Paragraph,
  TableDefault,
} from "@/components";
import { MOCK_MEMBERS } from "@/constants/contentCalls";
import { useState } from "react";

export const MembersTemplate = () => {
  const [members, setMembers] = useState(MOCK_MEMBERS);

  const handleEditItem = () => {};

  const handleDeleteItem = () => {};

  return (
    <LayoutWithSidebar>
      <Heading>Members</Heading>
      <Paragraph className="!text-default-grey">
        Adicione membros para compor seu time.
      </Paragraph>
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
