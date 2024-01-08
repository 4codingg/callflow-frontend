import { ONLY_TEXT_REGEX, VALID_EMAIL_REGEX } from "@/constants/regex";
import * as Yup from 'yup';

export const schemaCallItem = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email é um campo obrigatório.')
    .email('Email inválido.')
    .matches(VALID_EMAIL_REGEX, 'Email inválido.'),
  name: Yup.string()
    .trim()
    .required('Nome é um campo obrigatório.')
    .matches(ONLY_TEXT_REGEX, 'Nome inválido.')
    .min(2, 'Pelo menos 2 caracteres.'),
});