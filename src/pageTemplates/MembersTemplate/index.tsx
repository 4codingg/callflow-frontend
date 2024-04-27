import { fetchCompanyMembers } from "@/api/members/fetch-company-members";
import {
  Button,
  EmptyState,
  Heading,
  LayoutWithSidebar,
  Paragraph,
  Spinner,
  TableDefault,
} from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PlusCircle } from "phosphor-react";
import Empty from "@/assets/empty-state.png";
import { IDeleteCompanyMemberProps } from "@/@types/CompanyMember";
import { deleteCompanyMember } from "@/api/members/delete-company-members";
import { toast } from "@/utils/toast";

export const MembersTemplate = () => {
  const router = useRouter();

  const { data: membersList, isPending } = useQuery({
    queryKey: ["company-members"],
    queryFn: () => fetchCompanyMembers(),
  });

  const handleEditItem = (memberID) => {
    router.push(`/members/${memberID}`);
  };

  const handleDeleteItem = async (body: IDeleteCompanyMemberProps) => {
    deleteCompanyMember(body)
      .then((response) => {
        toast("success", "membro deletado com sucesso");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast("error", "Erro ao deletar");
      });
  };

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
      <div className="mt-4 flex flex-col items-center justify-center">
        {isPending ? (
          <Spinner className="mt-8 border-l-primary border-t-primary" />
        ) : !membersList?.length ? (
          <EmptyState
            icon={Empty}
            title="A lista de membros vazia"
            description="Adicione um membro."
          />
        ) : (
          <TableDefault
            content={membersList || []}
            handleEditItem={handleEditItem}
            handleDeleteItem={() => handleDeleteItem}
            disableAccessItem
          />
        )}
      </div>
    </LayoutWithSidebar>
  );
};
