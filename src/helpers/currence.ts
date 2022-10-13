export const convertCurrencyIntToString = (value: number) => {
  // Obtain 1 decimal places without rounding
  return Math.abs(value) >= 1.0e9
    ? (Math.floor((Math.abs(value) / 1.0e9) * 10) / 10).toString() + " Bil"
    : Math.abs(value) >= 1.0e6
    ? (Math.floor((Math.abs(value) / 1.0e6) * 10) / 10).toString() + " Mil"
    : value;
};
