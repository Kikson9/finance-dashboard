import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CATEGORY_COLORS } from "@/constants/categories";
import { formatCurrency } from "@/utils/format";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { name, value } = payload[0].payload;

  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2">
      <p className="text-[0.7rem] text-muted-text mb-0.5">{name}</p>
      <p className="text-sm font-semibold text-primary">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

export function SpendingChart({ data }) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-neutral-400">
        No expenses this month
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg px-[18px] py-4">
      <div className="flex gap-6 items-center max-w-md">
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={76}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.categoryId}
                    fill={CATEGORY_COLORS[entry.categoryId] ?? "#d4c5b0"}
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                position={{ x: "auto", y: "auto" }}
                wrapperStyle={{ zIndex: 10 }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[0.65rem] text-muted-text mb-0.5">spent</span>
            <span className="text-sm font-semibold text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-2.5 min-w-0">
          {data.map((entry) => (
            <li key={entry.categoryId} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[entry.categoryId] ?? "#d4c5b0",
                }}
              />
              <span className="text-[0.78rem] text-secondary truncate">
                {entry.name}
              </span>
              <span className="text-[0.78rem] font-medium text-primary tabular-nums ml-2">
                {formatCurrency(entry.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
