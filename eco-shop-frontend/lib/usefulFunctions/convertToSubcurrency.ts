function convertToSubcurrency(amount: number) {
  return Math.round(amount) * 100;
}

export default convertToSubcurrency;