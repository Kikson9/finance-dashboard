import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/format";

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

export default function Overview() {
  const { transactions, loading, error } = useTransactions({
    month: CURRENT_MONTH,
  });

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

  // Derive metrics from real transaction data
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;
  const savingsRate =
    income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  const recentTransactions = [...transactions].slice(0, 5);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="flex flex-col gap-8">
      {/* SECTION 1 - Hero */}
      <div>
        <p className="text-sm font-medium text-secondary mb-2">
          {greeting}, Daniel
        </p>
        <div className="flex items-baseline gap-4">
          <span className="text-[2.75rem] font-bold tracking-[-0.02em] text-primary leading-none">
            {formatCurrency(balance)}
          </span>
          <span
            className={`text-[0.8rem] font-semibold px-3 py-1 rounded-full ${
              balance >= 0
                ? "text-positive bg-positive-subtle"
                : "text-negative bg-negative-subtle"
            }`}
          >
            {balance >= 0 ? "↑" : "↓"} {formatCurrency(Math.abs(balance))} this
            month
          </span>
        </div>
        <p className="text-xs font-medium text-muted-text mt-1.5 tracking-[0.01em]">
          Available balance
        </p>
      </div>

      {/* SECTION 2 - Supporting metrics */}
      <div className="grid grid-cols-3 gap-3">
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
            className="bg-surface border border-border rounded-lg px-[18px] py-4"
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

      {/* SECTION 3 - Recent transactions */}
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
    </div>
  );
}
