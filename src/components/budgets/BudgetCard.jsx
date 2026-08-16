import { CATEGORY_COLORS } from "@/constants/categories";
import { formatCurrency } from "@/utils/format";

export function BudgetCard({ budget, onEdit }) {
  const percentage = (budget.spent / budget.limit) * 100;
  const barWidth = Math.min(percentage, 100);
  const isOver = budget.spent > budget.limit;
  const overAmount = budget.spent - budget.limit;

  return (
    <div
      onClick={() => onEdit(budget)}
      className={`
        bg-surface border rounded-lg px-[18px] py-4 flex flex-col gap-3 cursor-pointer
        transition-colors duration-150
        ${
          isOver
            ? "border-amber-600/30 hover:border-amber-600/50"
            : "border-border hover:border-border-strong"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              backgroundColor: CATEGORY_COLORS[budget.categoryId] ?? "#d4c5b0",
            }}
          />
          <span className="text-[0.82rem] font-medium text-primary">
            {budget.category?.name ?? "Unknown"}
          </span>
        </div>

        <div className="text-[0.78rem] text-muted-text">
          <span className="font-medium text-primary">
            {formatCurrency(budget.spent)}
          </span>
          {" / "}
          {formatCurrency(budget.limit)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#e8e4dc] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOver ? "bg-amber-600" : "bg-[#2d6a4f]"
          }`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {isOver ? (
          <>
            <span className="text-[0.72rem] text-amber-700">
              {formatCurrency(overAmount)} over limit
            </span>
            <span className="text-[0.7rem] font-medium text-amber-700 bg-amber-600/10 px-2 py-0.5 rounded">
              Over
            </span>
          </>
        ) : (
          <>
            <span className="text-[0.72rem] text-muted-text">
              {Math.round(percentage)}% used
            </span>
            <span className="text-[0.72rem] text-muted-text">
              {formatCurrency(budget.remaining)} left
            </span>
          </>
        )}
      </div>
    </div>
  );
}
