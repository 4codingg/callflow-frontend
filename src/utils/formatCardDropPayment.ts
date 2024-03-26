export function formatCardNDropPayment(cardNumber: string): string {
  const visibleDigits = 4;
  const maskedGroups = cardNumber.slice(0, -visibleDigits).replace(/\d/g, "*");
  const lastGroup = cardNumber.slice(-visibleDigits);
  const formattedGroups = maskedGroups.replace(/(.{4})(?!$)/g, "$1 ");

  return `${formattedGroups} ${lastGroup} `;
}
