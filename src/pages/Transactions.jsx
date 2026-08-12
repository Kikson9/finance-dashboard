import React, { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/format";

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

export default function Transactions() {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [selectedType, setSelectedType] = useState("all");

  const { transactions, loading, error } = useTransactions({
    month: selectedMonth,
  });

  const filtered = transactions.filter((t) => {
    if (selectedType === "all") return true;
    return t.type === selectedType;
  });

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const grouped = filtered.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(transaction);
    return groups;
  }, {});

  const groupedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  const monthOptions = [
    { value: "2026-08", label: "August 2026" },
    { value: "2026-07", label: "July 2026" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-sm text-muted-text">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-sm text-negative">Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-primary">Transactions</h1>
        <p className="text-xs text-muted-text mt-1">
          {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* SUMMARY BAR */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface border border-border rounded-lg px-[18px] py-4">
          <p className="text-[0.72rem] font-medium text-muted-text mb-1.5">
            Total in
          </p>
          <p className="text-xl font-bold tracking-[-0.01em] text-positive">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-lg px-[18px] py-4">
          <p className="text-[0.72rem] font-medium text-muted-text mb-1.5">
            Total out
          </p>
          <p className="text-xl font-bold tracking-[-0.01em] text-negative">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-2">
        {/* Month selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="text-[0.78rem] font-medium text-primary bg-surface border border-border rounded-lg px-3 py-2 cursor-pointer"
        >
          {monthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <div className="flex gap-1">
          {["all", "income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-[0.78rem] font-medium px-3 py-2 rounded-lg capitalize transition-colors ${
                selectedType === type
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSACTION LIST - grouped by date */}
      <div className="flex flex-col gap-4">
        {groupedDates.length === 0 ? (
          <p className="text-sm text-muted-text">No transactions found.</p>
        ) : (
          groupedDates.map((date) => (
            <div key={date}>
              {/* Date label */}
              <p className="text-[0.72rem] font-semibold text-muted-text mb-2 uppercase tracking-wide">
                {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {/* Transactions for this date */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                {grouped[date].map((tx, index) => (
                  <div
                    key={tx.id}
                    className={`flex justify-between items-center px-[18px] py-3 ${
                      index < grouped[date].length - 1
                        ? "border-b border-border-subtle"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="text-[0.82rem] font-medium text-primary">
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
          ))
        )}
      </div>
    </div>
  );
}
