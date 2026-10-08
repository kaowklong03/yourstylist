export default function StyleMemoryLoading() {
  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

  return (
    <div className="max-w-3xl space-y-8 animate-fadeIn" aria-busy="true" aria-label="กำลังโหลดกิจวัตรและสไตล์">
      {/* Header Skeleton */}
      <header className="dashboard-heading space-y-2">
        <div className="h-8 bg-line/40 rounded w-72 animate-pulse" />
        <div className="h-4 bg-line/30 rounded w-96 max-w-full animate-pulse" />
      </header>

      {/* Notice Banner */}
      <div className="p-4 border rounded-lg bg-olive-pale/20 space-y-1">
        <div className="h-4 bg-line/30 rounded w-full animate-pulse" />
      </div>

      {/* 7 Days Accordion Skeletons */}
      <div className="space-y-4">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="border rounded-xl bg-card overflow-hidden p-4 sm:px-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="font-bold text-sm text-charcoal w-16">วัน{day}</span>
              <div className="h-4 bg-line/30 rounded w-36 sm:w-48 animate-pulse" />
            </div>
            <div className="h-4 bg-line/20 rounded w-12 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
