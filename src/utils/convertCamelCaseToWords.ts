import { TRANSLATION } from "@/constants/translate";

export const convertCamelCaseToWordsAndTranslate = (camelCaseString) => {
  const translation = TRANSLATION[camelCaseString] ?? camelCaseString;

  const wordsWithSpaces = translation.replace(/([A-Z])/g, " $1");

  const capitalizedWords = wordsWithSpaces.replace(/^./, function (str) {
    return str.toUpperCase();
  });

  return capitalizedWords;
};
