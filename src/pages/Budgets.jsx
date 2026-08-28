import { useState, useMemo } from "react";
import { useBudgets } from "@/hooks/useBudgets";
import { useCategories } from "@/hooks/useCategories";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { BudgetModal } from "@/components/budgets/BudgetModal";
import { ErrorState } from "@/components/ui/ErrorState";
import { BudgetsSkeleton } from "@/components/budgets/BudgetsSkeleton";
import { formatCurrency } from "@/utils/format";

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

function formatMonth(yearMonth) {
  const [year, month] = yearMonth.split("-");
  return new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

export default function Budgets() {
  const { budgets, loading, error, addBudget, updateBudget, deleteBudget } =
    useBudgets();
  const { categories } = useCategories();

  // null = closed, "new" = add mode, budget object = edit mode
  const [modalBudget, setModalBudget] = useState(null);

  const availableCategories = useMemo(() => {
    const budgetedIds = new Set(budgets.map((b) => b.categoryId));
    return categories.filter(
      (c) => !budgetedIds.has(c.id) && c.id !== "cat_income",
    );
  }, [budgets, categories]);

  const summaryStats = useMemo(() => {
    const totalBudgeted = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overCount = budgets.filter((b) => b.spent > b.limit).length;
    return { totalBudgeted, totalSpent, overCount };
  }, [budgets]);

  function handleSubmit({ categoryId, limit }) {
    if (modalBudget === "new") {
      addBudget.mutate(
        { categoryId, limit },
        { onSuccess: () => setModalBudget(null) },
      );
    } else {
      updateBudget.mutate(
        { id: modalBudget.id, limit },
        { onSuccess: () => setModalBudget(null) },
      );
    }
  }

  function handleDelete(id) {
    deleteBudget.mutate(id, {
      onSuccess: () => setModalBudget(null),
    });
  }

  if (loading) {
    return <BudgetsSkeleton />;
  }

  if (error) {
    return <ErrorState message="Couldn't load your budgets. Try refreshing." />;
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* SECTION 1 - Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[1.4rem] font-bold tracking-[-0.01em] text-primary">
              Budgets
            </h1>
            <p className="text-xs text-muted-text mt-0.5">
              {formatMonth(CURRENT_MONTH)}
            </p>
          </div>
          <button
            onClick={() => setModalBudget("new")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2d6a4f] text-white text-[0.8rem] font-medium hover:bg-[#245a41] transition-colors"
          >
            + Add budget
          </button>
        </div>

        {/* SECTION 2 - Summary metrics */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              label: "Total budgeted",
              value: formatCurrency(summaryStats.totalBudgeted),
              type: "neutral",
            },
            {
              label: "Total spent",
              value: formatCurrency(summaryStats.totalSpent),
              type: "neutral",
            },
            {
              label: "Over limit",
              value: `${summaryStats.overCount} of ${budgets.length}`,
              type: summaryStats.overCount > 0 ? "warn" : "neutral",
            },
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
                  metric.type === "warn" ? "text-amber-700" : "text-primary"
                }`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* SECTION 3 - Budget cards */}
        <div>
          {budgets.length === 0 && (
            <div className="text-center mb-4">
              <p className="text-[0.9rem] font-semibold text-primary mb-1">
                No budgets set up yet
              </p>
              <p className="text-[0.78rem] text-muted-text">
                Set spending limits by category to keep track of where your
                money goes.
              </p>
            </div>
          )}

          {budgets.length === 0 ? (
            availableCategories.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setModalBudget("new")}
                  className="border border-dashed border-border rounded-lg px-[18px] py-4 flex flex-col items-center justify-center gap-2 text-muted-text hover:border-border-strong hover:text-secondary transition-colors w-full max-w-[240px]"
                >
                  <span className="text-xl">+</span>
                  <span className="text-[0.75rem]">Add a budget</span>
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {budgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={setModalBudget}
                />
              ))}

              {availableCategories.length > 0 && (
                <button
                  onClick={() => setModalBudget("new")}
                  className="border border-dashed border-border rounded-lg px-[18px] py-4 flex flex-col items-center justify-center gap-2 text-muted-text hover:border-border-strong hover:text-secondary transition-colors"
                >
                  <span className="text-xl">+</span>
                  <span className="text-[0.75rem]">Add a budget</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal - rendered outside the flow */}
      {modalBudget !== null && (
        <BudgetModal
          modalBudget={modalBudget}
          onClose={() => setModalBudget(null)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          availableCategories={availableCategories}
        />
      )}
    </>
  );
}
