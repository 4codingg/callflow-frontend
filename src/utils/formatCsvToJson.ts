import { v4 as uuidv4 } from "uuid"

export const formatCsvToJson = (results: any) => {
  let indexName = null;
  let indexNumber = null;
  let indexEmail = null;

  const resultsFormatted = results.map((line, lineIndex) => {
    line.map((item, index) => {

      const itemLowerCase = item.replace(/\s/g, '').toLowerCase()
      if (itemLowerCase === "name" || itemLowerCase === "nome" || itemLowerCase === "cliente" || itemLowerCase === "cliente" || itemLowerCase === "aluno") {
        indexName = index
      }
      if (itemLowerCase === "email") {
        indexEmail = index
      }
      if (itemLowerCase === "numero" || itemLowerCase === "numerodetelefone" || itemLowerCase === "telefone" || itemLowerCase === "number" || itemLowerCase === "número" || itemLowerCase === "contato") {
        indexNumber = index
      }
    })

    if (indexName === null || indexNumber === null) {
      return { error: true }
    }

    if (lineIndex !== 0 && line[indexName] && line[indexNumber]) {
      return {
        id: uuidv4(),
        name: line[indexName],
        email: indexEmail ? line[indexEmail] : null,
        phone: line[indexNumber]
      }
    }
  }).filter((result) => result !== undefined)

  return resultsFormatted
}