import * as Yup from "yup";
import { ONLY_TEXT_REGEX, VALID_EMAIL_REGEX } from "@/constants/regex";

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

export const schemaEditMember = Yup.object().shape({
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
  phone: Yup.string(),

  password: Yup.string()
    .trim()
    .required("Senha é um campo obrigatório.")
    .min(6, "Pelo menos 6 caracteres."),
});

export const schemaEditMemberTste = Yup.object().shape({
  email: Yup.string().trim(),
  name: Yup.string().trim(),
  phone: Yup.string().trim(),
  password: Yup.string().trim(),
});
