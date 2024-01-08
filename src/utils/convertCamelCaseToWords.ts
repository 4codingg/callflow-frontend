export const convertCamelCaseToWords = (camelCaseString) => {
  const wordsWithSpaces = camelCaseString.replace(/([A-Z])/g, ' $1');

  const capitalizedWords = wordsWithSpaces.replace(/^./, function (str) {
    return str.toUpperCase();
  });

  return capitalizedWords;
}
