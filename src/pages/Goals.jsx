import { useState, useMemo } from "react";
import { useGoals } from "@/hooks/useGoals";
import { useTransactions } from "@/hooks/useTransactions";
import { GoalCard } from "@/components/goals/GoalCard";
import { GoalModal } from "@/components/goals/GoalModal";
import { ErrorState } from "@/components/ui/ErrorState";
import { formatCurrency } from "@/utils/format";

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

export default function Goals() {
  const { goals, loading, error, addGoal, updateGoal, deleteGoal } = useGoals();

  // Current month transactions, needed to work out how much the user
  // could realistically put toward a goal each month. This feeds the
  // savings simulator inside GoalModal
  const { transactions } = useTransactions({ month: CURRENT_MONTH });

  const [modalGoal, setModalGoal] = useState(null);

  const summaryStats = useMemo(() => {
    const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const onTrackCount = goals.filter((g) => {
      if (g.currentAmount >= g.targetAmount) return true;
      const daysUntil = Math.ceil(
        (new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24),
      );
      return daysUntil > 30;
    }).length;

    return { totalSaved, totalTarget, onTrackCount };
  }, [goals]);

  // Monthly savings capacity, same calculation as Overview uses for the
  // health score. This is the number the simulator projects goal
  // completion against
  const monthlySavingsCapacity = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return income - expenses;
  }, [transactions]);

  function handleSubmit({ name, targetAmount, currentAmount, deadline }) {
    if (modalGoal === "new") {
      addGoal.mutate(
        { name, targetAmount, currentAmount, deadline },
        { onSuccess: () => setModalGoal(null) },
      );
    } else {
      updateGoal.mutate(
        { id: modalGoal.id, name, targetAmount, currentAmount, deadline },
        { onSuccess: () => setModalGoal(null) },
      );
    }
  }

  function handleDelete(id) {
    deleteGoal.mutate(id, {
      onSuccess: () => setModalGoal(null),
    });
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <p className="text-sm text-muted-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorState message="Couldn't load your goals. Try refreshing." />;
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* SECTION 1 - Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[1.4rem] font-bold tracking-[-0.01em] text-primary">
              Goals
            </h1>
            <p className="text-xs text-muted-text mt-0.5">Savings targets</p>
          </div>
          <button
            onClick={() => setModalGoal("new")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2d6a4f] text-white text-[0.8rem] font-medium hover:bg-[#245a41] transition-colors"
          >
            + Add goal
          </button>
        </div>

        {/* SECTION 2 - Summary metrics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total saved",
              value: formatCurrency(summaryStats.totalSaved),
              type: "neutral",
            },
            {
              label: "Total target",
              value: formatCurrency(summaryStats.totalTarget),
              type: "neutral",
            },
            {
              label: "On track",
              value: `${summaryStats.onTrackCount} of ${goals.length}`,
              type: "neutral",
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="bg-surface border border-border rounded-lg px-[18px] py-4"
            >
              <p className="text-[0.72rem] font-medium text-muted-text mb-1.5">
                {metric.label}
              </p>
              <p className="text-xl font-bold tracking-[-0.01em] text-primary">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* SECTION 3 - Goal cards */}
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={setModalGoal} />
          ))}

          <button
            onClick={() => setModalGoal("new")}
            className="border border-dashed border-border rounded-lg px-[18px] py-4 flex flex-col items-center justify-center gap-2 text-muted-text hover:border-border-strong hover:text-secondary transition-colors"
          >
            <span className="text-xl">+</span>
            <span className="text-[0.75rem]">Add a goal</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalGoal !== null && (
        <GoalModal
          modalGoal={modalGoal}
          onClose={() => setModalGoal(null)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          monthlySavingsCapacity={monthlySavingsCapacity}
        />
      )}
    </>
  );
}
