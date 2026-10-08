export default function WardrobeLoading() {
  return (
    <div className="space-y-8 animate-fadeIn" aria-busy="true" aria-label="กำลังโหลดตู้เสื้อผ้า">
      {/* Header Skeleton */}
      <div className="editorial-workflow-header flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div className="space-y-2">
          <div className="h-4 bg-line/40 rounded w-28 animate-pulse" />
          <div className="h-9 bg-line/40 rounded w-56 animate-pulse" />
          <div className="h-4 bg-line/30 rounded w-80 max-w-full animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 bg-line/40 w-32 animate-pulse" />
          <div className="h-10 bg-line/30 w-36 animate-pulse" />
        </div>
      </div>

      {/* Insights Intelligence Panel Skeleton */}
      <div className="border border-line bg-paper p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="h-4 bg-line/40 rounded w-48 animate-pulse" />
          <div className="h-4 bg-line/30 rounded w-28 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-3 bg-background border border-line space-y-2">
              <div className="h-3 bg-line/40 rounded w-20 animate-pulse" />
              <div className="h-6 bg-line/40 rounded w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Filter Row Skeleton */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[60, 50, 64, 70, 60, 90, 65, 55].map((width, idx) => (
            <div
              key={idx}
              className="h-8 bg-paper border border-line rounded-none shrink-0 animate-pulse"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>

        {/* Status Pills */}
        <div className="flex gap-2 pt-1 border-t border-line/40">
          {[70, 75, 90, 80].map((width, idx) => (
            <div
              key={idx}
              className="h-7 bg-line/30 rounded-none shrink-0 animate-pulse"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      </div>

      {/* Wardrobe Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-line bg-paper p-4 space-y-3 relative overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="aspect-[3/4] relative bg-line/30 border border-line overflow-hidden animate-pulse">
              <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-background/80 border border-line/60" />
              <div className="absolute bottom-2.5 left-2.5 w-14 h-4 bg-background/80 border border-line/60" />
            </div>

            {/* Info Placeholders */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <div className="h-3 bg-line/40 rounded w-14 animate-pulse" />
                <div className="h-3 bg-line/30 rounded w-16 animate-pulse" />
              </div>
              <div className="h-5 bg-line/40 rounded w-3/4 animate-pulse" />

              {/* Tags */}
              <div className="flex gap-1 pt-1">
                <div className="h-4 bg-line/30 rounded w-10 animate-pulse" />
                <div className="h-4 bg-line/30 rounded w-12 animate-pulse" />
                <div className="h-4 bg-line/30 rounded w-14 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
