export const formatCNPJ = (value) => {
  console.log("Valor original do CNPJ:", value);

  // Remover todos os caracteres não numéricos
  const cleanedValue = value.replace(/\D/g, "");
  console.log("Valor limpo do CNPJ:", cleanedValue);

  const formattedValue = cleanedValue
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

  console.log("Valor formatado do CNPJ:", formattedValue);

  return formattedValue;
};
