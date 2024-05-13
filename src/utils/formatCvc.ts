export function formatCvc(cvc: string) {
  if (!cvc) {
    return "";
  }

  cvc = cvc.replace(/\D/g, "");
  return cvc;
}

export const formatCardNumber = (v: any) => {
  console.log(v)
  console.log(v.length)

  if (!v) {
    return "";
  }

  if (v.length >= 19) {
    return v;
  }

  console.log("RAte")

  v = v.replace(/\D/g, "");
  try {
    return v.match(/\d{1,4}/g).join(" ");
  } catch {
    return v;
  }
};

export const formatCardExpiration = (ve) => {
  ve = ve.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  ve = ve.substring(0, 6); // Garante que o comprimento máximo seja de 6 caracteres

  let formattedDate = "";
  for (let i = 0; i < ve.length; i++) {
    formattedDate += ve[i];
    if (i === 1) {
      formattedDate += "/"; // Adiciona uma barra após os dois primeiros dígitos (mês)
    }
  }

  return formattedDate;
};