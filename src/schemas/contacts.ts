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
    .transform((value, originalValue) => {
      const numericValue = originalValue.replace(/\D/g, ""); // Remover caracteres não numéricos
      return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    })
    .matches(VALID_PHONE_REGEX, "Número de telefone inválido.")
    .required("Telefone é um campo obrigatório"),
});

export const schemaCreateMember = Yup.object().shape({
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
  role: Yup.string()
    .trim()
    .required("Cargo é um campo obrigatório.")
    .min(2, "Pelo menos 2 caracteres."),
  senha: Yup.string()
    .trim()
    .required("Senha é um campo obrigatório.")
    .min(6, "Pelo menos 6 caracteres."),
});
