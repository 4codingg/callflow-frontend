import { ONLY_TEXT_REGEX, VALID_EMAIL_REGEX } from '@/constants/regex';
import * as Yup from 'yup';

export const schemaPaymentInformation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Nome é um campo obrigatório.')
    .matches(ONLY_TEXT_REGEX, 'Invalid card name holder format')
    .min(2, 'Card name holder must be at least 2 characters'),
  cvc: Yup.string().matches(/^[0-9]{3,4}$/, 'CVC inválido').required('CVC é um campo obrigatório.'),
  expiry: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Data de validade inválida').required('Campo obrigatório'),
  number: Yup.string().matches(/^[0-9]{16}$/, 'Número de cartão inválido').required('Campo obrigatório'),
  email: Yup.string()
    .trim()
    .required('Email é um campo obrigatório.')
    .email('Email inválido.')
    .matches(VALID_EMAIL_REGEX, 'Email inválido.'),
});