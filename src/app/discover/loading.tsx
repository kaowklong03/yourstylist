export default function DiscoverLoading() {
  return (
    <div className="editorial-page-shell editorial-page-sponsored animate-fadeIn" aria-busy="true" aria-label="กำลังโหลดค้นหาสไตล์">
      <div className="container space-y-10 py-8">
        {/* Intro Header Skeleton */}
        <header className="editorial-page-header space-y-6">
          <div className="editorial-page-intro editorial-page-intro-sponsored">
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-line/40 rounded w-44 animate-pulse" />
              <div className="h-10 bg-line/40 rounded w-80 max-w-full animate-pulse" />
              <div className="h-4 bg-line/30 rounded w-full max-w-xl animate-pulse" />
            </div>
            <div className="hidden lg:block">
              <div className="h-9 bg-line/30 border border-line rounded w-64 animate-pulse" />
            </div>
          </div>

          {/* Category Filter Pills Skeleton */}
          <div className="filter-row pt-4 border-t border-line/60 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[80, 100, 90, 110, 85, 95].map((w, idx) => (
              <div
                key={idx}
                className="h-8 bg-paper border border-line shrink-0 animate-pulse"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </header>

        {/* Discovery Lookbook Grid Skeleton */}
        <section className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <article key={idx} className="ad-card">
                <div className="ad-image-wrap bg-line/30 animate-pulse relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <div className="absolute top-2 left-2 h-4 w-12 bg-background/80" />
                </div>
                <div className="ad-card-body space-y-2 p-3">
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-line/40 rounded w-16 animate-pulse" />
                    <div className="h-3 bg-line/30 rounded w-20 animate-pulse" />
                  </div>
                  <div className="h-4 bg-line/40 rounded w-3/4 animate-pulse" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-line/40 rounded w-14 animate-pulse" />
                    <div className="h-3 bg-line/30 rounded w-16 animate-pulse" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
