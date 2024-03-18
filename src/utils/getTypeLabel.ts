export const types = [
  {
    value: 'sms-mass',
    label: 'Envio de SMS em Massa'
  },
  {
    value: 'call-mass',
    label: 'Envio de Ligações em Massa'
  },
  {
    value: 'email-mass',
    label: 'Envio de Email em Massa'
  },
  {
    value: 'plan',
    label: 'Pagamento do plano'
  },
]

export const getTypeLabel = (value: string) => {
  const type = types.find((a) => a.value === value)
  return type.label
}