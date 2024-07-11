export function formatTimeHour(number) {
  number = number.replace(/\D/g, '');


  number = number.slice(0, 4);

  if (number.length === 4) {
    let hours = number.slice(0, 2);
    let minutes = number.slice(2, 4);
    return hours + ':' + minutes;
  }

  return number;
}





