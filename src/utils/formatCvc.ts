export function formatCvc(cvc: string) {
  if (!cvc) {
    return '';
  }

  cvc = cvc.replace(/\D/g, '');
  return cvc;
}