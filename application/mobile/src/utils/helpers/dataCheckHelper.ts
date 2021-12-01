export const getNumberAfterPossiblyEliminatingZero = (number: string) => {
  if (number.length > 0 && number.startsWith("0")) {
    number = number.substr(1);
  }
  return number;
};
