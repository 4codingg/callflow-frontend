export const formatCNPJ = (value) => {
  // Remove todos os caracteres não numéricos
  value = value.replace(/\D/g, "");

  // Aplica a máscara de CNPJ: XX.XXX.XXX/XXXX-XX
  return value
    .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona ponto após os dois primeiros dígitos
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após os próximos três dígitos
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona barra após os próximos três dígitos
    .replace(/(\d{4})(\d)/, "$1-$2"); // Adiciona hífen após os quatro últimos dígitos
};
