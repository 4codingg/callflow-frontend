import * as Yup from "yup";

export const validationSchemaSignup = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  CNPJ: Yup.string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido")
    .required("Campo obrigatório"),
  address: Yup.string().required("Campo obrigatório"),
  CEP: Yup.string()
    .matches(/^\d{5}-\d{3}$/, "CEP inválido")
    .required("Campo obrigatório"),
  number: Yup.string().required("Campo obrigatório"),
  type: Yup.string().required("Campo obrigatório"),
  objetivo: Yup.string().required("Campo obrigatório"),
});
export const initialValuesSignup1 = {
  name: "",
  CNPJ: "",
  address: "",
  CEP: "",
  number: "",
  type: "",
  objetivo: "",
};

export const validationSchemaSignup2 = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone inválido") // Considerando telefones brasileiros
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem coincidir")
    .required("Confirmação de senha obrigatória"),
});

export const initialValuesSignup2 = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmedPassword: "",
};
