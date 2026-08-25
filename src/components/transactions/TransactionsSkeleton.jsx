export function TransactionsSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* HEADER */}
      <div>
        <div className="h-6 w-36 bg-border rounded" />
        <div className="h-3 w-24 bg-border rounded mt-2" />
      </div>

      {/* SUMMARY BAR */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg px-[18px] py-4"
          >
            <div className="h-2.5 w-14 bg-border rounded mb-2.5" />
            <div className="h-6 w-24 bg-border rounded" />
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-2">
        <div className="h-9 w-32 bg-border rounded-lg" />
        <div className="flex gap-1">
          <div className="h-9 w-14 bg-border rounded-lg" />
          <div className="h-9 w-16 bg-border rounded-lg" />
          <div className="h-9 w-16 bg-border rounded-lg" />
        </div>
      </div>

      {/* TRANSACTION LIST */}
      {[0, 1].map((groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-2">
          <div className="h-2.5 w-20 bg-border rounded" />
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            {[0, 1, 2].map((rowIndex) => (
              <div
                key={rowIndex}
                className={`flex justify-between items-center px-[18px] py-3 ${
                  rowIndex < 2 ? "border-b border-border-subtle" : ""
                }`}
              >
                <div>
                  <div className="h-3 w-32 bg-border rounded mb-1.5" />
                  <div className="h-2.5 w-20 bg-border rounded" />
                </div>
                <div className="h-3.5 w-14 bg-border rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
