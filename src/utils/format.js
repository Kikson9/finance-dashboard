export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatMonth(dateString) {
  return dateString.slice(0, 7); // "2026-08-11" to "2026-08"
}
