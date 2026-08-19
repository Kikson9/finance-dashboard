const LABEL_COLORS = {
  Excellent: "#2d6a4f",
  Good: "#52b788",
  Fair: "#c9a87c",
  "Needs attention": "#b45309",
};

function getSubtext({ score, savingsRate, budgets, goals }) {
  const overBudgets = budgets.filter((b) => b.spent > b.limit).length;

  if (score >= 80) return "Strong savings rate and healthy budgets.";
  if (overBudgets > 0) {
    return `Solid savings, but ${overBudgets} budget${overBudgets > 1 ? "s" : ""} over limit.`;
  }
  if (savingsRate < 15) return "Savings rate is lower than usual this month.";
  return "Steady month with room to build savings.";
}

export function HealthScoreHero({
  income,
  expenses,
  budgets,
  goals,
  healthScore,
}) {
  const { score, label } = healthScore;
  const color = LABEL_COLORS[label];
  const angle = (score / 100) * 360;
  const subtext = getSubtext({
    score,
    savingsRate: healthScore.savingsRate,
    budgets,
    goals,
  });

  return (
    <div className="bg-surface border border-border rounded-xl px-5 py-4 flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: `conic-gradient(${color} 0deg ${angle}deg, #e8e4dc ${angle}deg 360deg)`,
        }}
      >
        <div className="w-[52px] h-[52px] rounded-full bg-surface flex flex-col items-center justify-center">
          <span className="text-base font-semibold" style={{ color }}>
            {score}
          </span>
          <span className="text-[8px] text-muted-text">/100</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-[0.68rem] text-muted-text mb-0.5">
          Your financial health
        </p>
        <p className="text-[0.88rem] font-medium text-primary">{label}</p>
        <p className="text-[0.72rem] text-secondary mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}
