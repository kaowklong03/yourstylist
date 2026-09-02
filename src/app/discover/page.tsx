import type { Metadata } from "next";
import Link from "next/link";
import { AdCard } from "@/components/ad-card";
import { EditorialPageIntro } from "@/components/ui";
import { getPublicAds, getPublicCategories } from "@/lib/catalog";
import { Pagination } from "@/components/pagination";
import { Info } from "lucide-react";

export const metadata: Metadata = { title: "ค้นหาสไตล์และร้านค้า | YourStylist" };

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const sParams = await searchParams;
  const page = Math.max(1, parseInt(sParams?.page || "1", 10) || 1);
  const pageSize = 20;

  const [allAds, categories] = await Promise.all([getPublicAds(), getPublicCategories()]);
  const totalAds = allAds.length;
  const totalPages = Math.ceil(totalAds / pageSize);
  const ads = allAds.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="editorial-page-shell editorial-page-sponsored">
      <div className="container space-y-10 py-8">
        <header className="editorial-page-header">
          <EditorialPageIntro
            tone="sponsored"
            eyebrow="SPONSORED LOOKBOOK / DISCOVERY"
            title="ค้นหาสไตล์จากร้านค้าอิสระ"
            body="สำรวจชุดและเสื้อผ้าจากร้านค้าพันธมิตร ทุกรายการในหน้านี้เป็นโฆษณาที่ติดป้ายชัดเจน และไม่กระทบคำแนะนำจาก AI Stylist"
            aside={
              <div className="editorial-disclosure">
                <Info aria-hidden="true" />
                <span>โฆษณาโปร่งใส แยกจาก AI Advice 100%</span>
              </div>
            }
          />

          {/* Category navigation */}
          <nav className="filter-row pt-4 border-t border-line/60" aria-label="กรองตามหมวดหมู่">
            <Link href="/discover" className="filter-pill active" aria-current="page">
              ทั้งหมด ({totalAds})
            </Link>
            {categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                className="filter-pill"
                key={category.id}
              >
                {category.name_th}
              </Link>
            ))}
          </nav>
        </header>

        {/* Discovery Product Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-normal text-charcoal">
              รายการล่าสุดทั้งหมด ({totalAds})
            </h2>
            {totalPages > 1 ? (
              <span className="text-xs font-mono text-muted uppercase">
                หน้า {page} จาก {totalPages} (สูงสุด {pageSize} ต่อหน้า)
              </span>
            ) : (
              <span className="text-xs font-mono text-muted uppercase">เรียงตามความสดใหม่</span>
            )}
          </div>

          <div className="ad-grid">
            {ads.map((ad, index) => (
              <AdCard ad={ad} key={ad.id} priority={index < 4} />
            ))}
          </div>

          {totalPages > 1 ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/discover"
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}
