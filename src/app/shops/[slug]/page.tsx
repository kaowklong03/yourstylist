import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AdCard } from "@/components/ad-card";
import { DemoBadge } from "@/components/ui";
import { ShopViewBeacon } from "@/components/shop-view-beacon";
import { getPublicAds, getPublicShop } from "@/lib/catalog";
import { Pagination } from "@/components/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const shop = await getPublicShop((await params).slug);
  return { title: shop?.name ?? "ร้านค้า" };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sParams = await searchParams;
  const page = Math.max(1, parseInt(sParams?.page || "1", 10) || 1);
  const pageSize = 20;

  const shop = await getPublicShop(slug);
  if (!shop) notFound();

  const allShopAds = (await getPublicAds()).filter((ad) => ad.shop_id === shop.id);
  const totalAds = allShopAds.length;
  const totalPages = Math.ceil(totalAds / pageSize);
  const shopAds = allShopAds.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container">
      <ShopViewBeacon shopId={shop.id} disabled={shop.is_demo} />
      <section className="shop-hero">
        <div className="shop-cover">
          <Image
            src={shop.cover_path ?? "/demo/look-sand.svg"}
            alt={`ภาพหน้าปกร้าน ${shop.name}`}
            width={1600}
            height={700}
            priority
            unoptimized={Boolean(shop.cover_path?.startsWith("/api/assets"))}
          />
          {shop.is_demo ? <DemoBadge /> : null}
        </div>
        <div className="shop-intro">
          <div className="shop-logo-wrap">
            <Image
              src={shop.logo_path ?? "/demo/shop-quiet.svg"}
              alt={`โลโก้ร้าน ${shop.name}`}
              width={96}
              height={96}
              className="shop-logo"
              unoptimized={Boolean(shop.logo_path?.startsWith("/api/assets"))}
            />
          </div>
          <div className="shop-info">
            <h1>{shop.name}</h1>
            {shop.description ? <p>{shop.description}</p> : null}
            {(shop.website_url || shop.instagram_url) ? (
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                {shop.website_url ? (
                  <a
                    href={shop.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive hover:underline"
                  >
                    🌐 {shop.website_url} ↗
                  </a>
                ) : null}
                {shop.instagram_url ? (
                  <a
                    href={shop.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive hover:underline"
                  >
                    📸 {shop.instagram_url} ↗
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
          {shop.is_demo ? <span className="button button-ghost self-start mt-12" aria-disabled="true">Demo shop</span> : null}
        </div>
      </section>
      <section className="section">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
          <div>
            <p className="eyebrow">Sponsored by this shop</p>
            <h2 className="mb-0">โฆษณาจากร้าน ({totalAds})</h2>
          </div>
          {totalPages > 1 ? (
            <span className="text-xs text-muted font-mono">
              หน้า {page} จาก {totalPages} (แสดงสูงสุด {pageSize} รายการต่อหน้า)
            </span>
          ) : null}
        </div>

        {shopAds.length === 0 ? (
          <p className="text-muted text-sm py-8">ร้านค้านี้ยังไม่มีโฆษณาที่เผยแพร่</p>
        ) : (
          <div className="ad-grid">
            {shopAds.map((ad) => (
              <AdCard ad={ad} key={ad.id} />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/shops/${shop.slug}`}
          />
        ) : null}
      </section>
    </div>
  );
}
