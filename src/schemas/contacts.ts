import {
  ONLY_TEXT_REGEX,
  VALID_EMAIL_REGEX,
  VALID_PHONE_REGEX,
} from "@/constants/regex";
import * as Yup from "yup";

export const schemaContactItem = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email é um campo obrigatório.")
    .email("Email inválido.")
    .matches(VALID_EMAIL_REGEX, "Email inválido."),
  name: Yup.string()
    .trim()
    .required("Nome é um campo obrigatório.")
    .matches(ONLY_TEXT_REGEX, "Nome inválido.")
    .min(2, "Pelo menos 2 caracteres."),
  phone: Yup.string()
    .trim()
    .matches(VALID_PHONE_REGEX, "Número de telefone inválido.")
    .required("Telefone é um campo obrigatório")
    .transform((value, originalValue) => {
      return originalValue.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }),
});
