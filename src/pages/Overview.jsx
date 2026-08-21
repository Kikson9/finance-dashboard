import { useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { useTransactions } from "@/hooks/useTransactions";
import { useBudgets } from "@/hooks/useBudgets";
import { useGoals } from "@/hooks/useGoals";
import { formatCurrency } from "@/utils/format";
import { calculateHealthScore } from "@/utils/healthScore";
import {
  getPreviousMonth,
  calculateNet,
  calculateMonthOverMonth,
} from "@/utils/compareMonths";
import { detectRecurringBills } from "@/utils/detectBills";
import { HealthScoreHero } from "@/components/overview/HealthScoreHero";
import { DetectedBills } from "@/components/overview/DetectedBills";
import { SpendingChart } from "@/components/overview/SpendingChart";

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);
const PREVIOUS_MONTH = getPreviousMonth(CURRENT_MONTH);

export default function Overview() {
  const { user } = useUser();

  // Current month transactions drive most of the page
  const { transactions, loading, error } = useTransactions({
    month: CURRENT_MONTH,
  });

  // Previous month is fetched separately needed both for the balance
  // card's month-over-month comparison and for bill detection, which
  // needs at least two months to confirm a recurring pattern.
  const { transactions: previousTransactions } = useTransactions({
    month: PREVIOUS_MONTH,
  });

  const { budgets } = useBudgets();
  const { goals } = useGoals();

  // Aggregate current-month expenses by category for the donut chart
  // Grouping happens here (page level), not inside SpendingChart, so the
  // chart component stays a pure display component
  const spendingByCategory = useMemo(() => {
    const expenseMap = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const id = t.categoryId;
        if (!expenseMap[id]) {
          expenseMap[id] = {
            categoryId: id,
            name: t.category?.name ?? "Other",
            value: 0,
          };
        }
        expenseMap[id].value += Math.abs(t.amount);
      });
    return Object.values(expenseMap).sort((a, b) => b.value - a.value);
  }, [transactions]);

  // Bill detection runs across both months combined, a single month of
  // data can't confirm a recurring pattern on its own
  const detectedBills = useMemo(() => {
    return detectRecurringBills([...transactions, ...previousTransactions]);
  }, [transactions, previousTransactions]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <p className="text-sm text-muted-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <p className="text-sm text-negative">Something went wrong: {error}</p>
      </div>
    );
  }

  // Core derived metrics from current-month transactions
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;
  const savingsRate =
    income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  // Month-over-month net comparison for the balance card badge
  // This replaces the old "is balance positive" check with a real
  // comparison against last month's net (income - expenses)
  const currentNet = calculateNet(transactions);
  const previousNet = calculateNet(previousTransactions);
  const momChange = calculateMonthOverMonth(currentNet, previousNet);

  // Composite financial health score, weighted blend of savings rate,
  // budget adherence, and goal progress. utils/healthScore.js has
  // the full formula and weight redistribution logic
  const healthScore = calculateHealthScore({
    income,
    expenses,
    budgets,
    goals,
  });

  const recentTransactions = [...transactions].slice(0, 5);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  // Badge styling and arrow direction driven by the real comparison,
  // not just whether the balance happens to be positive
  const badgeColor =
    momChange.direction === "up"
      ? "text-positive bg-positive-subtle"
      : momChange.direction === "down"
        ? "text-negative bg-negative-subtle"
        : "text-muted-text bg-surface-alt";

  const badgeArrow =
    momChange.direction === "up"
      ? "↑"
      : momChange.direction === "down"
        ? "↓"
        : "→";

  return (
    <div className="flex flex-col gap-8">
      {/* SECTION 1 - Financial health score (hero) */}
      <div>
        {user && (
          <p className="text-sm font-medium text-secondary mb-3">
            {greeting}, {user.name.split(" ")[0]}
          </p>
        )}
        <HealthScoreHero
          income={income}
          expenses={expenses}
          budgets={budgets}
          goals={goals}
          healthScore={healthScore}
        />
      </div>

      {/* SECTION 2 - Supporting metrics (balance now lives here, not the hero) */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-surface border border-border rounded-lg px-[16px] py-4">
          <p className="text-[0.72rem] font-medium text-muted-text mb-1.5">
            Balance
          </p>
          <p className="text-xl font-bold tracking-[-0.01em] text-primary mb-1">
            {formatCurrency(balance)}
          </p>
          <span
            className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${badgeColor}`}
          >
            {badgeArrow} {momChange.percent}% vs last month
          </span>
        </div>

        {[
          { label: "Income", value: formatCurrency(income), type: "positive" },
          {
            label: "Expenses",
            value: formatCurrency(expenses),
            type: "negative",
          },
          { label: "Savings rate", value: `${savingsRate}%`, type: "neutral" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-surface border border-border rounded-lg px-[16px] py-4"
          >
            <p className="text-[0.72rem] font-medium text-muted-text mb-1.5">
              {metric.label}
            </p>
            <p
              className={`text-xl font-bold tracking-[-0.01em] ${
                metric.type === "positive"
                  ? "text-positive"
                  : metric.type === "negative"
                    ? "text-negative"
                    : "text-primary"
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* SECTION 3 - Detected bills (renders nothing if none found) */}
      <DetectedBills bills={detectedBills} />

      {/* SECTION 4 - Recent transactions */}
      <div>
        <p className="text-[0.78rem] font-semibold text-primary mb-3">
          Recent transactions
        </p>
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {recentTransactions.map((tx, index) => (
            <div
              key={tx.id}
              className={`flex justify-between items-center px-[18px] py-3 ${
                index < recentTransactions.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <div>
                <p className="text-[0.82rem] font-medium text-primary m-0">
                  {tx.description}
                </p>
                <p className="text-[0.7rem] text-muted-text mt-0.5">
                  {tx.category?.name ?? "Uncategorized"}
                </p>
              </div>
              <span
                className={`text-[0.85rem] font-semibold ${
                  tx.type === "income" ? "text-positive" : "text-negative"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(Math.abs(tx.amount))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5 - Spending by category */}
      <div>
        <p className="text-[0.78rem] font-semibold text-primary mb-3">
          Spending by category
        </p>
        <SpendingChart data={spendingByCategory} />
      </div>
    </div>
  );
}
