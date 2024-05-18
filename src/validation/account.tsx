import * as Yup from "yup";

export const validationSchemaAccountUser = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .matches(/^\+\d{1,3}\d{1,14}$/, "Telefone inválido")
    .required("Campo obrigatório"),
});

export const validationSchemaAccountCompany = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  CNPJ: Yup.string().required("CNPJ é obrigatório"),
  zipcode: Yup.string()
    .matches(/^\d{5}-\d{3}$/, "CEP inválido")
    .required("CEP é obrigatório"),
  type: Yup.string().required("Tipo de empresa é obrigatório"),
});
