export const formatStringToNumber = (stringNumber) => {
  if (!stringNumber || stringNumber.trim() === "") {
    return 0;
  }
  const cleanStringNumber = stringNumber.replace(/\./g, "");
  return parseFloat(cleanStringNumber.replace(",", "."));
};
