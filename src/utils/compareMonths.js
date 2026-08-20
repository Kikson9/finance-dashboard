export function getPreviousMonth(yearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  const date = new Date(year, month - 2, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function calculateNet(transactions) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return income - expenses;
}

export function calculateMonthOverMonth(currentNet, previousNet) {
  if (previousNet === 0) {
    return currentNet > 0
      ? { percent: 100, direction: "up" }
      : { percent: 0, direction: "flat" };
  }

  const percent = Math.round(
    ((currentNet - previousNet) / Math.abs(previousNet)) * 100,
  );
  const direction = percent > 0 ? "up" : percent < 0 ? "down" : "flat";

  return { percent: Math.abs(percent), direction };
}
