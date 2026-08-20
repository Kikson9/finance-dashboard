function normalizeDescription(description) {
  return description.trim().toLowerCase();
}

function amountsAreSimilar(a, b, tolerancePercent = 15) {
  const diff = Math.abs(a - b);
  const avg = (Math.abs(a) + Math.abs(b)) / 2;
  if (avg === 0) return true;
  return (diff / avg) * 100 <= tolerancePercent;
}

export function detectRecurringBills(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const groups = {};
  expenses.forEach((t) => {
    const key = normalizeDescription(t.description);
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  const detected = [];

  Object.values(groups).forEach((group) => {
    if (group.length < 2) return;

    const sorted = [...group].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let isConsistent = true;
    for (let i = 1; i < sorted.length; i++) {
      const daysApart = Math.round(
        (new Date(sorted[i].date) - new Date(sorted[i - 1].date)) /
          (1000 * 60 * 60 * 24),
      );
      const sameAmount = amountsAreSimilar(
        sorted[i].amount,
        sorted[i - 1].amount,
      );

      if (daysApart < 20 || daysApart > 40 || !sameAmount) {
        isConsistent = false;
      }
    }

    if (isConsistent) {
      const latest = sorted[sorted.length - 1];
      detected.push({
        description: latest.description,
        categoryId: latest.categoryId,
        category: latest.category,
        amount: Math.abs(latest.amount),
        occurrences: sorted.length,
        lastDate: latest.date,
      });
    }
  });

  return detected.sort((a, b) => b.amount - a.amount);
}
