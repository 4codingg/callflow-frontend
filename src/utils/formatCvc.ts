export function formatCvc(cvc: string) {
  if (!cvc) {
    return "";
  }

  cvc = cvc.replace(/\D/g, "");
  return cvc;
}

export const formatCardNumber = (v: any) => {
  if (!v) {
    return "";
  }

  if (v.length > 19) {
    return v;
  }

  v = v.replace(/\D/g, "");
  try {
    return v.match(/\d{1,4}/g).join(" ");
  } catch {
    return v;
  }
};
export const formatCardExpiration = (ve: any) => {
  if (ve.length > 7) {
    return;
  }

  ve = ve.replace(/\D/g, "");

  if (ve.length < 1) {
    return "";
  }

  ve = ve.match(/\d{1,2}/g).join("/");
  return ve;
};
