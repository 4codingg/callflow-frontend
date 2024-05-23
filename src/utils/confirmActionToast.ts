import Swal from "sweetalert2";
import { toast } from "./toast";

export const confirmActionToast = async (
  title: string,
  callback: () => Promise<void>
) => {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: "Excluir",
    confirmButtonColor: "#00DEA3",
    cancelButtonColor: "#E85959",
  }).then(async (result) => {
    if (result.isConfirmed) {
      toast("success", "Método de pagamento removido com sucesso!");
      await callback();
    }
  });
};
