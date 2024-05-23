import Swal from "sweetalert2";
import { toast } from "./toast";

export const confirmActionToast = (
  title: string,
  callback: () => Promise<void>
) => {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: "Excluir",
    cancelButtonColor: "#E85959",
    confirmButtonColor: "#00DEA3",
  }).then(async (result) => {
    if (result.isConfirmed) {
      toast("success", "Método de pagamento removido com sucesso!");
      await callback();
    }
  });
};
