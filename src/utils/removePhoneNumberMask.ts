export const removePhoneNumberMask = (phoneNumber) => {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");
  const formattedPhoneNumber = "+55" + numericPhoneNumber;
  return formattedPhoneNumber;
};
