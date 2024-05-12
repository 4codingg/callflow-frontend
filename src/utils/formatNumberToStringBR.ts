export const formatNumberToStringBR = (number) => {
  const parsedNumber = parseFloat(number); // Converte a entrada em um número de ponto flutuante
  return parsedNumber.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
