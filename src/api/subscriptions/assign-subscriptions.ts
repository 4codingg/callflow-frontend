import api from "@/services/axios";

export interface IAssignSubscriptionBody {
  type: "free" | "plus" | "premium";
}

export const assignSubscription = async (body: IAssignSubscriptionBody) => {
  const response = await api.post(`/subscription/assign`, body);
  return response.data as IAssignSubscriptionBody;
};
