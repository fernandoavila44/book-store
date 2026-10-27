
const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const formatCurrency = (amount: number): string => {
  return copFormatter.format(amount);
};

export default formatCurrency;
