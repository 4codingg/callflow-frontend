import { format } from 'date-fns';

export function formatDateToDDMMYYYYHHMM(date) {
  return format(date, 'dd/MM/yyyy HH:mm');
}