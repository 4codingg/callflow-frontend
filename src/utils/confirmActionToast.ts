import Swal from "sweetalert2";
import { toast } from "./toast";

export const confirmActionToast = async (
  title: string,
  callback: () => Promise<void>,
  messageSuccess?: string
) => {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    confirmButtonColor: "#00DEA3",
    cancelButtonColor: "#E85959",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      toast("success", messageSuccess);
      await callback();
    }
  });
};
