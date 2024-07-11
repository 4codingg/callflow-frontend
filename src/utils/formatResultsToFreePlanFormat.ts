export const formatResultsToFreePlanFormat = (results: any[]) => {
  const resultsFormatted = results.map((item) => {
    const itemKeys = Object.keys(item)

    const itemFormatted = {
      id: item.id,
      name: "",
      phone: "",
      email: ""
    }

    const validLabelsForNameVariable = ['name', 'customer', 'cliente', 'nome']
    const validLabelsForPhoneVariable = ['phone', 'telefone', 'contato', 'fone']
    const validLabelsForEmailVariable = ['email', 'e-mail']

    itemKeys.forEach((key) => {
      if (validLabelsForNameVariable.includes(key.toLowerCase())) {
        itemFormatted.name = item[key]
      }
      if (validLabelsForPhoneVariable.includes(key.toLowerCase())) {
        itemFormatted.phone = item[key]
      }
      if (validLabelsForEmailVariable.includes(key.toLowerCase())) {
        itemFormatted.email = item[key]
      }
    })

    return itemFormatted
  })
  return resultsFormatted
}