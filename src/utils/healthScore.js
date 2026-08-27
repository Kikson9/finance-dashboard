function scoreSavingsRate(income, expenses) {
  if (income <= 0) return null;

  const savingsRate = ((income - expenses) / income) * 100;

  if (savingsRate <= 0) return 0;
  if (savingsRate >= 30) return 100;
  return Math.round((savingsRate / 30) * 100);
}

function scoreBudgetAdherence(budgets) {
  if (budgets.length === 0) return null;
  const withinLimit = budgets.filter((b) => b.spent <= b.limit).length;
  return Math.round((withinLimit / budgets.length) * 100);
}

function scoreGoalProgress(goals) {
  if (goals.length === 0) return null;

  const onTrackCount = goals.filter((g) => {
    if (g.currentAmount >= g.targetAmount) return true;
    const daysUntil = Math.ceil(
      (new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return daysUntil > 30;
  }).length;

  return Math.round((onTrackCount / goals.length) * 100);
}

function getLabel(score) {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Fair";
  return "Needs attention";
}

export function calculateHealthScore({ income, expenses, budgets, goals }) {
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : null;

  const components = [
    { score: scoreSavingsRate(income, expenses), weight: 0.5 },
    { score: scoreBudgetAdherence(budgets), weight: 0.3 },
    { score: scoreGoalProgress(goals), weight: 0.2 },
  ];

  const available = components.filter((c) => c.score !== null);
  const totalWeight = available.reduce((sum, c) => sum + c.weight, 0);

  const finalScore =
    totalWeight > 0
      ? Math.round(
          available.reduce(
            (sum, c) => sum + c.score * (c.weight / totalWeight),
            0,
          ),
        )
      : 0;

  return {
    score: finalScore,
    label: totalWeight === 0 ? "Not enough data" : getLabel(finalScore),
    savingsRate: savingsRate === null ? null : Math.round(savingsRate),
  };
}
