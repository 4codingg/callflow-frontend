export const PLANS_ROWS = [
  {
    label: "Bônus de SMS (Acumulativo)",
    values: {
      free: "0u",
      plus: "55u",
      premium: "120u"
    },
  },
  {
    label: "Bônus de Ligações (Acumulativo)",
    values: {
      free: "0u",
      plus: "40u",
      premium: "90u",
    },
  },
  {
    label: "Bônus de E-mails (Não Acumulativo)",
    values: {
      free: "100u",
      plus: "1000u",
      premium: "5000u",
    },
  },
  {
    label: "Suporte por e-mail e WhatsApp",
    values: {
      free: true,
      plus: true,
      premium: true,
    },
  },
  {
    label: "Suporte por Meet",
    values: {
      free: null,
      plus: null,
      premium: true,
    },
  },
  {
    label: "Lista de contatos  personalizada",
    values: {
      free: "Lista padrão com variáveis pré estabelecidas.",
      plus: true,
      premium: true,
    },
  },
  {
    label: "Análise e relatórios",
    values: {
      free: null,
      plus: true,
      premium: true,
    },
  },
];

export const PLANS_INFORMATIONS = [
  {
    value: "free",
    title: "Grátis",
    description: "Ideal para iniciantes e uso pessoal.",
  },
  {
    value: "plus",
    title: "Plus",
    description: "Perfeito para usuários avançados e pequenas equipes.",
  },
  {
    value: "premium",
    title: "Premium",
    description: "Solução completa para profissionais e empresas.",
  },
];
