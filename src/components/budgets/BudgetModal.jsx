import { useState, useEffect, useCallback } from "react";
import { CATEGORY_COLORS } from "@/constants/categories";
import { formatCurrency } from "@/utils/format";

export function BudgetModal({
  modalBudget,
  onClose,
  onSubmit,
  onDelete,
  availableCategories,
}) {
  const isEdit = modalBudget !== null && modalBudget !== "new";

  const [categoryId, setCategoryId] = useState("");
  const [limit, setLimit] = useState("");
  const [error, setError] = useState("");

  // Sync form state when modal opens
  useEffect(() => {
    if (isEdit) {
      setCategoryId(modalBudget.categoryId);
      setLimit(String(modalBudget.limit));
    } else {
      setCategoryId("");
      setLimit("");
    }
    setError("");
  }, [modalBudget, isEdit]);

  // Escape key dismiss
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
    if (!categoryId) {
      setError("Select a category.");
      return;
    }
    if (!limit || Number(limit) <= 0) {
      setError("Enter a limit greater than $0.");
      return;
    }
    setError("");
    onSubmit({ categoryId, limit: Number(limit) });
  }

  const editingColor = isEdit
    ? (CATEGORY_COLORS[modalBudget.categoryId] ?? "#d4c5b0")
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
        aria-label={isEdit ? "Edit budget" : "New budget"}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-surface border border-border-strong rounded-xl p-5 w-full max-w-sm flex flex-col gap-4 pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEdit && (
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: editingColor }}
                />
              )}
              <p className="text-[0.88rem] font-semibold text-primary">
                {isEdit ? modalBudget.category?.name : "New budget"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded border border-border text-muted-text hover:bg-surface-alt transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Category field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-medium text-secondary">
              Category
            </label>
            {isEdit ? (
              <>
                <div className="px-3 py-2 rounded-lg border border-border bg-surface-alt text-[0.82rem] text-muted-text">
                  {modalBudget.category?.name}
                </div>
                <p className="text-[0.7rem] text-muted-text">
                  Delete and recreate to change category.
                </p>
              </>
            ) : (
              <>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    setError("");
                  }}
                  className="px-3 py-2 rounded-lg border border-border bg-surface text-[0.82rem] text-primary"
                >
                  <option value="">Select a category</option>
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-[0.7rem] text-muted-text">
                  Categories with existing budgets are hidden.
                </p>
              </>
            )}
          </div>

          {/* Limit field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-medium text-secondary">
              Monthly limit
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.82rem] text-muted-text">
                $
              </span>
              <input
                type="number"
                min="1"
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                  setError("");
                }}
                placeholder="0.00"
                className="w-full pl-6 pr-3 py-2 rounded-lg border border-border bg-surface text-[0.82rem] text-primary"
              />
            </div>
          </div>

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
              {isEdit ? "Save changes" : "Add budget"}
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
                  onClick={() => onDelete(modalBudget.id)}
                  className="w-full py-2 rounded-lg border border-amber-600/25 text-amber-700 text-[0.82rem] hover:bg-amber-600/5 transition-colors"
                >
                  Delete budget
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
