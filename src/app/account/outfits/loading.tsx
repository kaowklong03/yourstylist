export default function OutfitsLoading() {
  return (
    <div className="space-y-8 animate-fadeIn" aria-busy="true" aria-label="กำลังโหลดชุดที่บันทึกไว้">
      {/* Header Skeleton */}
      <div className="editorial-workflow-header border-b border-line pb-6 space-y-2">
        <div className="h-4 bg-line/40 rounded w-48 animate-pulse" />
        <div className="h-9 bg-line/40 rounded w-80 max-w-full animate-pulse" />
        <div className="h-4 bg-line/30 rounded w-96 max-w-full animate-pulse" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex border-b border-line gap-6 pb-0 overflow-x-auto">
        <div className="h-10 border-b-2 border-charcoal w-36 animate-pulse" />
        <div className="h-10 w-32 animate-pulse" />
        <div className="h-10 w-36 animate-pulse" />
      </div>

      {/* Outfits Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-line bg-paper p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Top Direction and Action */}
              <div className="flex items-center justify-between border-b border-line pb-2">
                <div className="h-5 bg-olive/10 rounded w-20 animate-pulse" />
                <div className="h-4 bg-line/30 rounded w-24 animate-pulse" />
              </div>

              {/* Title & Description */}
              <div className="space-y-2 pt-1">
                <div className="h-6 bg-line/40 rounded w-3/4 animate-pulse" />
                <div className="h-3.5 bg-line/30 rounded w-full animate-pulse" />
              </div>

              {/* Items Breakdown list */}
              <div className="space-y-2 pt-3 border-t border-line/60">
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-line/40 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-line/30 rounded w-32 animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-line/40 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-line/30 rounded w-28 animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-line/40 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-line/30 rounded w-24 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-line flex items-center justify-between">
              <div className="h-4 bg-line/30 rounded w-24 animate-pulse" />
              <div className="h-4 bg-line/30 rounded w-20 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
