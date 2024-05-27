import Empty from "@/assets/empty-state.png";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Line } from "@/components/Line";
import { Paragraph } from "@/components/Paragraph";
import { TableDefault } from "../Tables/TableDefault";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoryTransactions } from "@/api/wallet/fetch-history-transactions";

export const PaymentsHistoryTab = () => {
  const { data } = useQuery({
    queryKey: ["history-transactions"],
    queryFn: fetchHistoryTransactions,
  });

  const historyTransactionsIsEmpty = data?.historyTransactions?.length === 0;

  return (
    <div className="mt-4">
      <Card>
        <Paragraph className="font-medium !text-base">
          Métodos de pagamentos
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Confira seus métodos de pagamentos
        </Paragraph>
        <Line className="my-4" />
        <div className="mt-4">
          {historyTransactionsIsEmpty ? (
            <EmptyState
              description="A empresa ainda não possui nenhum método de pagamento registrado. Adicione um método de pagamento para começar a processar transações."
              title="Sem metódo de pagamento"
              icon={Empty}
            />
          ) : (
            <TableDefault
              showFields={[
                "historyType",
                "cost",
                "processedAt",
                "paymentMethod",
                "last4",
              ]}
              content={data?.historyTransactions || []}
              handleDeleteItem={() => {}}
              disableAccessItem
              disableEditItem
            />
          )}
        </div>
      </Card>
    </div>
  );
};
