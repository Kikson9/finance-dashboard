export function BudgetsSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-6 w-28 bg-border rounded" />
          <div className="h-3 w-20 bg-border rounded mt-2" />
        </div>
        <div className="h-9 w-28 bg-border rounded-lg" />
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg px-[18px] py-4"
          >
            <div className="h-2.5 w-20 bg-border rounded mb-2.5" />
            <div className="h-6 w-16 bg-border rounded" />
          </div>
        ))}
      </div>

      {/* BUDGET CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg px-[18px] py-4 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-border flex-shrink-0" />
                <div className="h-3 w-24 bg-border rounded" />
              </div>
              <div className="h-2.5 w-20 bg-border rounded ml-4" />
            </div>

            <div className="h-1.5 w-full bg-border rounded-full" />

            <div className="flex items-center justify-between">
              <div className="h-2.5 w-14 bg-border rounded" />
              <div className="h-2.5 w-16 bg-border rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
