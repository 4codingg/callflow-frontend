import * as Yup from "yup";

export const validationSchemaAboutCompanySignupStep = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
  name: Yup.string().required("Nome da empresa é obrigatório"),
  CNPJ: Yup.string()
    .matches(/^\d{13}$/, "CNPJ inválido")
    .required("CNPJ é obrigatório"),
  address: Yup.object().shape({
    address: Yup.string().required("Endereço é obrigatório"),
    number: Yup.number().required("Número é obrigatório"),
    zipcode: Yup.string()
      .matches(/^\d{5}-\d{3}$/, "CEP inválido")
      .required("CEP é obrigatório"),
  }),
  quantityEmployers: Yup.number().required(
    "Quantidade de empregados é obrigatória"
  ),
  type: Yup.string().required("Tipo de empresa é obrigatório"),
});

export const validationSchemaAboutUserSignupStep = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem coincidir")
    .required("Confirmação de senha obrigatória"),
});
