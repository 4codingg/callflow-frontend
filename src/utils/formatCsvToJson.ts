export const formatCsvToJson = (results: any) => {
  const firstLine = results[0];
  const indexesNames = firstLine.map((item) => item.replace(/\s/g, '').toLowerCase()).filter(Boolean)

  console.log(indexesNames)

  const resultsFormatted = results.map((line, index) => {
    const lineFormatted = {};

    if (index !== 0) {
      line.map((item, idx) => {
        if (indexesNames[idx]) {
          lineFormatted[indexesNames[idx]] = item
        }
      })
    }
    return lineFormatted
  }).filter((r) => Object.keys(r).length > 0)
  return resultsFormatted
}