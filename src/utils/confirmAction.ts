import Swal from "sweetalert2";

export const confirmAction = (textConfirmation: string) => {
  Swal.fire({
    title: "Você tem certeza?",
    text: "Não será possível reverter isso.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#00DEA3",
    cancelButtonColor: "#E85959",
    confirmButtonText: "Sim, deletar.",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deletado!",
        text: textConfirmation,
        icon: "success",
      });
    }
  });
};
