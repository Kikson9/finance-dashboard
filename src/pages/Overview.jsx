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
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* SECTION 1 — Hero */}

      <div>
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            marginBottom: "8px",
          }}
        >
          {greeting}, {name}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
          <span
            style={{
              fontSize: "2.75rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              lineHeight: 1,
            }}
          >
            {balance}
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: deltaPositive
                ? "var(--color-positive)"
                : "var(--color-negative)",
              backgroundColor: deltaPositive
                ? "var(--color-positive-subtle)"
                : "var(--color-negative-subtle)",
              padding: "4px 10px",
              borderRadius: "20px",
            }}
          >
            {deltaPositive ? "↑" : "↓"} {delta}
          </span>
        </div>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--color-text-muted)",
            marginTop: "6px",
            letterSpacing: "0.01em",
          }}
        >
          Available balance
        </p>
      </div>

      {/* SECTION 2 — Supporting metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {[
          { label: "Income", value: income, type: "positive" },
          { label: "Expenses", value: expenses, type: "negative" },
          { label: "Savings rate", value: savingsRate, type: "neutral" },
        ].map((metric) => (
          <div
            key={metric.label}
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "16px 18px",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
                marginBottom: "6px",
              }}
            >
              {metric.label}
            </p>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color:
                  metric.type === "positive"
                    ? "var(--color-positive)"
                    : metric.type === "negative"
                      ? "var(--color-negative)"
                      : "var(--color-text-primary)",
              }}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* SECTION 3 — Recent transactions */}
      <div>
        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "12px",
          }}
        >
          Recent transactions
        </p>
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 18px",
                borderBottom:
                  index < transactions.length - 1
                    ? "1px solid #f0ede8"
                    : "none",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    margin: 0,
                  }}
                >
                  {tx.name}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--color-text-muted)",
                    margin: "2px 0 0",
                  }}
                >
                  {tx.category}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: tx.positive
                    ? "var(--color-positive)"
                    : "var(--color-negative)",
                }}
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
