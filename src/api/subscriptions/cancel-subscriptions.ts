import api from "@/services/axios";

export const cancelSubscription = async () => {
  const response = await api.post("/subscription/cancel");
  return response.data;
};
