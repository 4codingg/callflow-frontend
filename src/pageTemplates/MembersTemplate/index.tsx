import { fetchCompanyMembers } from "@/api/members/fetch-company-members";
import {
  Button,
  EmptyState,
  Heading,
  LayoutWithSidebar,
  Paragraph,
  TableDefault,
} from "@/components";
import { MOCK_MEMBERS } from "@/constants/contentCalls";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import Empty from "@/assets/empty-state.png";

export const MembersTemplate = () => {
  const [members, setMembers] = useState(MOCK_MEMBERS);

  const { data: membersList } = useQuery({
    queryKey: ["company-members"],
    queryFn: () => fetchCompanyMembers(),
    staleTime: Infinity,
  });

  const handleEditItem = () => {};

  const handleDeleteItem = () => {};

  const router = useRouter();
  console.log(membersList);

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
          onClick={() => router.push("/members/create")}
        >
          Adicionar membro
        </Button>
      </header>
      <div className="mt-4">
        {!membersList?.length ? (
          <EmptyState
            icon={Empty}
            title="A lista de membros vazia"
            description="Adicione um membro."
          />
        ) : (
          <TableDefault
            content={membersList || []}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
            disableAccessItem
          />
        )}
      </div>
    </LayoutWithSidebar>
  );
};
