import { plaTransactions } from "@/components/layouts/Tables/TableInvoicesPayments";
import api from "@/services/axios";

export async function getHistoryBillingPlan() {
  const response = await api.get(`/transactions/plan`);
  return response.data as plaTransactions[];
}
