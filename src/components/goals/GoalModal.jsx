import { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "@/utils/format";
import { simulateGoal } from "@/utils/simulateGoal";

export function GoalModal({
  modalGoal,
  onClose,
  onSubmit,
  onDelete,
  monthlySavingsCapacity,
}) {
  const isEdit = modalGoal !== null && modalGoal !== "new";

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      setName(modalGoal.name);
      setTargetAmount(String(modalGoal.targetAmount));
      setCurrentAmount(String(modalGoal.currentAmount));
      setDeadline(modalGoal.deadline);
    } else {
      setName("");
      setTargetAmount("");
      setCurrentAmount("");
      setDeadline("");
    }
    setError("");
  }, [modalGoal, isEdit]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  function handleSubmit() {
    if (!name.trim()) {
      setError("Enter a goal name.");
      return;
    }
    if (!targetAmount || Number(targetAmount) <= 0) {
      setError("Enter a target amount greater than $0.");
      return;
    }
    if (Number(currentAmount) < 0) {
      setError("Amount saved can't be negative.");
      return;
    }
    if (Number(currentAmount) > Number(targetAmount)) {
      setError("Amount saved can't exceed the target.");
      return;
    }
    if (!deadline) {
      setError("Select a target date.");
      return;
    }
    setError("");
    onSubmit({
      name: name.trim(),
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount || 0),
      deadline,
    });
  }

  const progressPercent = targetAmount
    ? Math.min(
        Math.round((Number(currentAmount || 0) / Number(targetAmount)) * 100),
        100,
      )
    : 0;

  // Live simulation recalculated as the user edits target, current
  // amount, or deadline. Only meaningful once all three fields have
  // values otherwise the math doesn't mean anything yet
  const simulation =
    isEdit && targetAmount && deadline
      ? simulateGoal({
          currentAmount: Number(currentAmount || 0),
          targetAmount: Number(targetAmount),
          deadline,
          monthlySavingsCapacity,
        })
      : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit goal" : "New goal"}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-surface border border-border-strong rounded-xl p-5 w-full max-w-sm flex flex-col gap-4 pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-[0.88rem] font-semibold text-primary">
              {isEdit ? modalGoal.name : "New goal"}
            </p>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded border border-border text-muted-text hover:bg-surface-alt transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-medium text-secondary">
              Goal name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Emergency fund"
              className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-[0.82rem] text-primary"
            />
          </div>

          {/* Target amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-medium text-secondary">
              Target amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.82rem] text-muted-text">
                $
              </span>
              <input
                type="number"
                min="1"
                value={targetAmount}
                onChange={(e) => {
                  setTargetAmount(e.target.value);
                  setError("");
                }}
                placeholder="0.00"
                className="w-full pl-6 pr-3 py-2 rounded-lg border border-border bg-surface text-[0.82rem] text-primary"
              />
            </div>
          </div>

          {/* Current amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-medium text-secondary">
              {isEdit ? "Amount saved so far" : "Starting amount saved"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.82rem] text-muted-text">
                $
              </span>
              <input
                type="number"
                min="0"
                value={currentAmount}
                onChange={(e) => {
                  setCurrentAmount(e.target.value);
                  setError("");
                }}
                placeholder="0.00"
                className="w-full pl-6 pr-3 py-2 rounded-lg border border-border bg-surface text-[0.82rem] text-primary"
              />
            </div>
            {!isEdit && (
              <p className="text-[0.7rem] text-muted-text">
                Leave at 0 if starting fresh.
              </p>
            )}
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-medium text-secondary">
              Target date
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-[0.82rem] text-primary"
            />
          </div>

          {/* Live progress preview - edit mode only */}
          {isEdit && targetAmount && (
            <div className="bg-surface border border-border rounded-lg px-3 py-2.5 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[0.7rem] text-muted-text">Progress</span>
                <span className="text-[0.72rem] font-medium text-primary">
                  {progressPercent}% ·{" "}
                  {formatCurrency(
                    Math.max(
                      Number(targetAmount) - Number(currentAmount || 0),
                      0,
                    ),
                  )}{" "}
                  remaining
                </span>
              </div>
              <div className="h-1 bg-[#e8e4dc] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#2d6a4f] transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Savings simulator - edit mode only, needs target and deadline set */}
          {simulation && (
            <div className="bg-surface border border-border rounded-lg px-3 py-2.5 flex flex-col gap-1.5">
              <span className="text-[0.7rem] text-muted-text">
                At your current pace
              </span>

              {simulation.status === "complete" && (
                <p className="text-[0.78rem] font-medium text-[#2d6a4f]">
                  Goal already reached.
                </p>
              )}

              {simulation.status === "stalled" && (
                <p className="text-[0.78rem] text-secondary">
                  You are not saving toward this goal this month, so a
                  projection is not available. You would need to save{" "}
                  {formatCurrency(simulation.requiredMonthly)} a month to hit
                  the deadline.
                </p>
              )}

              {(simulation.status === "on-pace" ||
                simulation.status === "behind") && (
                <>
                  <p className="text-[0.78rem] text-secondary">
                    Projected to reach this goal by{" "}
                    <span className="font-medium text-primary">
                      {simulation.projectedDate.toLocaleDateString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                  {simulation.status === "behind" && (
                    <p className="text-[0.72rem] text-amber-700">
                      That is after your target date. Save{" "}
                      {formatCurrency(simulation.requiredMonthly)} a month to
                      stay on track.
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Inline error */}
          {error && (
            <p className="text-[0.75rem] text-negative -mt-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSubmit}
              className="w-full py-2 rounded-lg bg-[#2d6a4f] text-white text-[0.82rem] font-medium hover:bg-[#245a41] transition-colors"
            >
              {isEdit ? "Save changes" : "Add goal"}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg border border-border text-[0.82rem] text-secondary hover:bg-surface-alt transition-colors"
            >
              Cancel
            </button>

            {isEdit && (
              <>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => onDelete(modalGoal.id)}
                  className="w-full py-2 rounded-lg border border-red-600/25 text-red-700 text-[0.82rem] hover:bg-red-600/5 transition-colors"
                >
                  Delete goal
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
