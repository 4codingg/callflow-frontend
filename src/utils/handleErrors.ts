import { toast } from "./toast";

export const handleErrors = (err: any) => {
  if (err.response?.data?.message) {
    toast("error", err.response.data.message)
    return
  }

  toast("error", "Algo deu errado.");
}