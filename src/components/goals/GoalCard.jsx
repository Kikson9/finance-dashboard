import { formatCurrency } from "@/utils/format";

function getDeadlineStatus(deadline) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return { label: "Overdue", type: "overdue", daysUntil };
  if (daysUntil <= 30) return { label: "Due soon", type: "urgent", daysUntil };
  return { label: "On track", type: "on-track", daysUntil };
}

function formatDeadline(deadline) {
  return new Date(deadline).toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GoalCard({ goal, onEdit }) {
  const isComplete = goal.currentAmount >= goal.targetAmount;
  const status = getDeadlineStatus(goal.deadline);
  const percentage = Math.min(goal.percentComplete, 100);

  const badgeStyles = {
    "on-track": "text-[#2d6a4f] bg-[#2d6a4f]/10",
    urgent: "text-amber-700 bg-amber-600/10",
    overdue: "text-red-700 bg-red-600/10",
    complete: "text-[#2d6a4f] bg-[#2d6a4f]/10",
  };

  const barStyles = {
    "on-track": "bg-[#2d6a4f]",
    urgent: "bg-amber-600",
    overdue: "bg-red-600",
    complete: "bg-[#2d6a4f]",
  };

  const cardStatus = isComplete ? "complete" : status.type;

  return (
    <div
      onClick={() => onEdit(goal)}
      className={`
        bg-surface border rounded-lg px-[18px] py-4 flex flex-col gap-3 cursor-pointer
        transition-colors duration-150
        ${cardStatus === "urgent" ? "border-amber-600/30 hover:border-amber-600/50" : ""}
        ${cardStatus === "overdue" ? "border-red-600/30 hover:border-red-600/50" : ""}
        ${cardStatus === "on-track" || cardStatus === "complete" ? "border-border hover:border-border-strong" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[0.82rem] font-medium text-primary">{goal.name}</p>
          <p className="text-[0.7rem] text-muted-text mt-0.5">
            Due {formatDeadline(goal.deadline)}
          </p>
        </div>
        <span
          className={`text-[0.7rem] font-medium px-2 py-0.5 rounded flex-shrink-0 ${badgeStyles[cardStatus]}`}
        >
          {isComplete ? "Complete" : status.label}
        </span>
      </div>

      {/* Amounts */}
      <div className="flex items-baseline justify-between">
        <span className="text-[1.15rem] font-semibold text-primary">
          {formatCurrency(goal.currentAmount)}
        </span>
        <span className="text-[0.78rem] text-muted-text">
          of {formatCurrency(goal.targetAmount)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#e8e4dc] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barStyles[cardStatus]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[0.72rem] text-muted-text">
          {goal.percentComplete}% complete
        </span>
        {isComplete ? (
          <span className="text-[0.72rem] font-medium text-[#2d6a4f]">
            Goal reached
          </span>
        ) : (
          <span
            className={`text-[0.72rem] font-medium ${
              cardStatus === "overdue"
                ? "text-red-700"
                : cardStatus === "urgent"
                  ? "text-amber-700"
                  : "text-[#2d6a4f]"
            }`}
          >
            {formatCurrency(goal.remaining)} to go
          </span>
        )}
      </div>
    </div>
  );
}
