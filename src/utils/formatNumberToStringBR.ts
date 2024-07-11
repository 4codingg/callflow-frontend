export const formatNumberToStringBR = (number) => {
  const parsedNumber = parseFloat(number);
  return parsedNumber.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
