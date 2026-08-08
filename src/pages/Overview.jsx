import React from "react";

const mockData = {
  greeting: "Good morning",
  name: "Alex",
  balance: "$2,450.80",
  delta: "+$320 this month",
  deltaPositive: true,
  income: "$3,200.00",
  expenses: "$749.20",
  savingsRate: "23%",
  transactions: [
    {
      id: 1,
      name: "Spotify",
      category: "Entertainment",
      amount: "-$9.99",
      positive: false,
    },
    {
      id: 2,
      name: "Salary deposit",
      category: "Income",
      amount: "+$3,200.00",
      positive: true,
    },
    {
      id: 3,
      name: "Whole Foods",
      category: "Groceries",
      amount: "-$64.30",
      positive: false,
    },
  ],
};

export default function Overview() {
  const {
    greeting,
    name,
    balance,
    delta,
    deltaPositive,
    income,
    expenses,
    savingsRate,
    transactions,
  } = mockData;

  return (
    <div className="flex flex-col gap-8">
      {/* SECTION 1 — Hero */}

      <div>
        <p className="text-sm font-medium text-secondary mb-2">
          {greeting}, {name}
        </p>
        <div className="flex items-baseline gap-4">
          <span className="text-[2.75rem] font-bold tracking-[-0.02em] text-primary leading-none">
            {balance}
          </span>
          <span
            className={`text-[0.8rem] font-semibold px-3 py-1 rounded-full ${
              deltaPositive
                ? "text-positive bg-positive-subtle"
                : "text-negative bg-negative-subtle"
            }`}
          >
            {deltaPositive ? "↑" : "↓"} {delta}
          </span>
        </div>
        <p className="text-xs font-medium text-muted-text mt-1.5 tracking-[0.01em]">
          Available balance
        </p>
      </div>

      {/* SECTION 2 — Supporting metrics */}

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Income", value: income, type: "positive" },
          { label: "Expenses", value: expenses, type: "negative" },
          { label: "Savings rate", value: savingsRate, type: "neutral" },
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

      {/* SECTION 3 — Recent transactions */}

      <div>
        <p className="text-[0.78rem] font-semibold text-primary mb-3">
          Recent transactions
        </p>
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className={`flex justify-between items-center px-[18px] py-3 ${
                index < transactions.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <div>
                <p className="text-[0.82rem] font-medium text-primary m-0">
                  {tx.name}
                </p>
                <p className="text-[0.7rem] text-muted-text mt-0.5">
                  {tx.category}
                </p>
              </div>
              <span
                className={`text-[0.85rem] font-semibold ${
                  tx.positive ? "text-positive" : "text-negative"
                }`}
              >
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
