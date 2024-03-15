import * as Yup from "yup";

export const schemaSendCallsListMessage = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required("Mensagem é um campo obrigatório.")
    .min(2, "Pelo menos 2 caracteres."),
});
