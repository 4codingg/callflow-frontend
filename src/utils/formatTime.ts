export function formatTimeHour(numero) {
  numero = numero.replace(/\D/g, '');
  

  numero = numero.slice(0, 4);
  
  if (numero.length === 4) {
      let parte1 = numero.slice(0, 2);
      let parte2 = numero.slice(2, 4);
      return parte1 + ':' + parte2;
  }
  
  return numero; 
}





