export const INSTRUCTIONS_SMS = [
  {
    id: 1,
    description: "Selecione sua lista de contatos",
  },
  {
    id: 2,
    description: "Clique em 'Personalize sua mensagem'",
  },
  {
    id: 3,
    description: "Personaliza sua mensagem com variáveis, se necessário",
    "sub-description": 'As variáveis disponíveis serão mostradas. Você pode usá-las dessa forma: "Olá {nome}, conseguimos visualizar seu registro de {endereço}..."'
  },
  {
    id: 4,
    description: `Confira a variável de destino e os relatórios de custo`,
  },
  {
    id: "5 (opcional)",
    description: `Agende seu envio`,
    "sub-description": "Você pode agendar seu envio para qualquer dia e hora desejado."
  },
  {
    id: 6,
    description: `Clique em Enviar`,
    "sub-description": "Será aberto uma tela de pop-up para confirmação dos dados."
  },
  {
    id: 7,
    description: `Confirme seus dados e envie`
  },
];

export const INSTRUCTIONS_EMAIL = [
  {
    id: 1,
    description: "Selecione sua lista de contatos",
  },
  {
    id: 2,
    description:
      "Digite o titulo e a mensagem a ser enviada utilizando as variáveis criadas",
  },
  {
    id: 3,
    description:
      "Selecione qual dessas variáveis da sua lista é a variável de destino.",
  },
  {
    id: 4,
    description: `Após confirmar as informações, clique em ${"Enviar para a lista"} e aguarde a confirmação.`,
  },
];

export const INSTRUCTIONS_CALL = [
  {
    id: 1,
    description: "Selecione sua lista de contatos",
  },
  {
    id: 2,
    description:
      "Digite a mensagem a ser enviada utilizando as variáveis criadas",
  },
  {
    id: 3,
    description:
      "Selecione qual dessas variáveis da sua lista é a variável de destino.",
  },
  {
    id: 4,
    description: `Após confirmar as informações, clique em ${"Enviar para a lista"} e aguarde a confirmação.`,
  },
];

export const INSTRUCTIONS_CREATE_CONTACTS_LIST = [
  {
    id: 1,
    description: "Escolha um nome para sua lista de contatos.",
  },
  {
    id: 2,
    description: "Adicione as variáveis que serão utilizadas na lista.",
    "sub-description": "Exemplo: nome, contato, email, ..."
  },
  {
    id: 3,
    description: "Escolha suas variáveis de destino",
    "sub-description": "As variáveis de destino são variáveis que você pretende usar de destino em disparos de SMS/Ligações/E-mails."
  },
  {
    id: 4,
    description: `Clique em avançar para confirmar a criação da sua lista.`,
  }
];

export const INSTRUCTIONS_UPDATE_CONTACTS_LIST = [
  {
    id: 1,
    description:
      "Clique em Upload de Planilha para anexar sua planilha em csv ou xlsx",
  },
  {
    id: 2,
    description: "As colunas das planilhas precisam obedecer as suas variáveis",
  },
  {
    id: 3,
    description: "Escolha seu arquivo",
  },
  {
    id: 4,
    description: `Nunca esqueça de salvar suas alterações`,
  },
];
