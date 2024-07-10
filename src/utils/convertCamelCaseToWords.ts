import { TRANSLATION } from "@/constants/translate";

export const convertCamelCaseToWordsAndTranslate = (camelCaseString) => {

  if (camelCaseString === "destination") {
    return "Destino";
  }
  if (camelCaseString === "message") {
    return "Mensagem";
  }

  const translation = TRANSLATION[camelCaseString] ?? camelCaseString;

  const wordsWithSpaces = translation.replace(/([A-Z])/g, " $1");

  const capitalizedWords = wordsWithSpaces.replace(/^./, function (str) {
    return str.toUpperCase();
  });

  return capitalizedWords;
};
