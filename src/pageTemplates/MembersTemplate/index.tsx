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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PlusCircle } from "phosphor-react";
import Empty from "@/assets/empty-state.png";
import { deleteCompanyMember } from "@/api/members/delete-company-members";
import { toast } from "@/utils/toast";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";

export const MembersTemplate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setGlobalLoading } = useGlobalLoading();

  const { data: membersList, isPending } = useQuery({
    queryKey: ["company-members"],
    queryFn: () => fetchCompanyMembers(),
  });

  const { mutateAsync: deleteCompanyMemberFn } = useMutation({
    mutationFn: deleteCompanyMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-members"],
      });
    },
  });
  const handleEditItem = (memberId: string) => {
    router.push(`/members/${memberId}`);
  };

  const handleDeleteMember = async (memberId: string) => {
    setGlobalLoading(true);
    try {
      await deleteCompanyMemberFn(memberId);
      toast("success", "Sucesso ao deletar membro");
    } catch (error) {
      toast("error", "Erro ao deletar membro");
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <LayoutWithSidebar>
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <Heading>Membros</Heading>
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
            handleDeleteItem={handleDeleteMember}
            disableAccessItem
          />
        )}
      </div>
    </LayoutWithSidebar>
  );
};
