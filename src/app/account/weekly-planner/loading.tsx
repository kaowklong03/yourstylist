export default function WeeklyPlannerLoading() {
  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn" aria-busy="true" aria-label="กำลังโหลดแผนลุค 7 วัน">
      {/* Heading Skeleton */}
      <header className="dashboard-heading space-y-2">
        <div className="h-8 bg-line/40 rounded w-72 animate-pulse" />
        <div className="h-4 bg-line/30 rounded w-96 max-w-full animate-pulse" />
      </header>

      {/* Top Action Skeleton */}
      <div className="flex justify-end">
        <div className="h-10 bg-line/40 rounded-md w-52 animate-pulse" />
      </div>

      {/* 7-Day Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="border rounded-xl bg-card overflow-hidden flex flex-col border-line"
          >
            {/* Card Day Header */}
            <div className="p-4 border-b border-line bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-charcoal">วัน{day}</span>
                <div className="h-4 bg-line/40 rounded w-12 animate-pulse" />
              </div>
              <div className="h-3 bg-line/30 rounded w-36 animate-pulse" />
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col items-center justify-center text-center min-h-[160px] space-y-4">
              <div className="space-y-2 w-full flex flex-col items-center">
                <div className="h-3.5 bg-line/30 rounded w-32 animate-pulse" />
                <div className="h-3 bg-line/20 rounded w-24 animate-pulse" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-2 w-full pt-2">
                <div className="h-8 bg-line/40 rounded w-36 animate-pulse" />
                <div className="h-3 bg-line/20 rounded w-28 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Box */}
      <div className="p-6 border rounded-xl border-line/60 bg-paper space-y-3">
        <div className="h-5 bg-line/40 rounded w-44 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-line/30 rounded w-4/5 animate-pulse" />
          <div className="h-3 bg-line/30 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
