import api from "@/services/axios";

export interface IAssignSubscriptionBody {
  type: "free" | "plus" | "premium";
}

export const cancelSubscription = async (body: IAssignSubscriptionBody) => {
  const response = await api.post("/subscription/cancel", body);
  return response.data;
};
