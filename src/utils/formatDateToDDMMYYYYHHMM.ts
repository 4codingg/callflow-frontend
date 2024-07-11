import { format } from 'date-fns';

export function formatDateToDDMMYYYYHHMM(date, removeHours?: boolean) {
  if(typeof date  === "string") {
    date = new Date(date)
  }

  return removeHours ? format(date, 'dd/MM/yyyy') : format(date, 'dd/MM/yyyy HH:mm');
}