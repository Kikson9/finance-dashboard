import { CATEGORY_COLORS } from "@/constants/categories";
import { formatCurrency } from "@/utils/format";

export function DetectedBills({ bills }) {
  if (bills.length === 0) {
    return null;
  }

  const monthlyTotal = bills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="bg-surface border-[1.5px] border-dashed border-[#2d6a4f]/30 rounded-xl px-5 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[0.78rem] font-semibold text-primary">
          Detected recurring bills
        </p>
        <span className="text-[0.72rem] text-secondary">
          {formatCurrency(monthlyTotal)}/mo
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {bills.map((bill) => (
          <div
            key={bill.description}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[bill.categoryId] ?? "#d4c5b0",
                }}
              />
              <span className="text-[0.78rem] text-primary truncate">
                {bill.description}
              </span>
              <span className="text-[0.68rem] text-muted-text flex-shrink-0">
                monthly
              </span>
            </div>
            <span className="text-[0.78rem] text-secondary flex-shrink-0">
              {formatCurrency(bill.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
