export function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* GREETING */}
      <div className="h-4 w-32 bg-border rounded" />

      {/* HEALTH SCORE HERO */}
      <div className="bg-surface border border-border rounded-xl px-5 py-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-border flex-shrink-0" />
        <div className="flex-1">
          <div className="h-2.5 w-28 bg-border rounded mb-2" />
          <div className="h-3.5 w-16 bg-border rounded mb-1.5" />
          <div className="h-2.5 w-44 bg-border rounded" />
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="bg-surface border border-border rounded-lg px-[16px] py-4">
          <div className="h-2.5 w-12 bg-border rounded mb-2" />
          <div className="h-5 w-16 bg-border rounded mb-2" />
          <div className="h-4 w-16 bg-border rounded" />
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg px-[16px] py-4"
          >
            <div className="h-2.5 w-12 bg-border rounded mb-2" />
            <div className="h-5 w-14 bg-border rounded" />
          </div>
        ))}
      </div>

      {/* RECENT TRANSACTIONS */}
      <div>
        <div className="h-3 w-32 bg-border rounded mb-3" />
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-[18px] py-3 ${
                i < 4 ? "border-b border-border-subtle" : ""
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

      {/* SPENDING CHART */}
      <div>
        <div className="h-3 w-36 bg-border rounded mb-3" />
        <div className="bg-surface border border-border rounded-lg px-[18px] py-4">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto md:mx-0 md:flex-row md:gap-6">
            <div className="relative w-40 h-40 flex-shrink-0">
              <div className="w-40 h-40 rounded-full border-[30px] border-border" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-2 w-8 bg-border rounded mb-1.5" />
                <div className="h-3 w-14 bg-border rounded" />
              </div>
            </div>

            <div className="flex flex-col gap-2.5 min-w-0 w-full md:w-auto md:flex-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-border flex-shrink-0" />
                  <div className="h-2.5 w-20 bg-border rounded" />
                  <div className="h-2.5 w-12 bg-border rounded ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
