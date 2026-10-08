"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Filter, Check, SlidersHorizontal } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";

export interface CategoryFilterItem {
  id: string;
  slug: string;
  name_th: string;
}

interface AdaptiveCategoryFilterProps {
  categories: CategoryFilterItem[];
  activeSlug?: string;
  totalCount?: number;
}

export function AdaptiveCategoryFilter({
  categories,
  activeSlug,
  totalCount,
}: AdaptiveCategoryFilterProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const activeLabel = activeCategory ? activeCategory.name_th : "ทั้งหมด";

  const handleSelectCategory = (href: string) => {
    setIsSheetOpen(false);
    router.push(href);
  };

  return (
    <div className="pt-4 border-t border-line/60">
      {/* 1. Desktop View (hidden on mobile, visible on md and up) */}
      <nav
        className="hidden md:flex filter-row"
        aria-label="กรองตามหมวดหมู่ (Desktop)"
      >
        <Link
          href="/discover"
          className={`filter-pill ${!activeSlug ? "active" : ""}`}
          aria-current={!activeSlug ? "page" : undefined}
        >
          ทั้งหมด {totalCount !== undefined ? `(${totalCount})` : ""}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`filter-pill ${activeSlug === category.slug ? "active" : ""}`}
            aria-current={activeSlug === category.slug ? "page" : undefined}
          >
            {category.name_th}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="filter-pill inline-flex items-center gap-1.5 text-muted hover:text-charcoal cursor-pointer"
          aria-label="เปิดหน้าต่างตัวเลือกหมวดหมู่ทั้งหมด (Desktop Modal)"
        >
          <SlidersHorizontal className="w-3 h-3 text-olive" />
          <span>ตัวเลือกทั้งหมด</span>
        </button>
      </nav>

      {/* 2. Mobile View (visible on mobile md:hidden) - Bottom Sheet Trigger */}
      <div className="md:hidden flex items-center justify-between gap-3 bg-paper border border-line p-3">
        <div className="flex items-center gap-2 text-xs font-medium text-charcoal truncate">
          <Filter className="w-4 h-4 text-olive shrink-0" />
          <span className="text-muted">หมวดหมู่:</span>
          <span className="font-semibold text-charcoal bg-olive-pale/60 px-2 py-0.5 rounded text-xs truncate">
            {activeLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal text-background hover:bg-olive text-xs font-medium rounded-none transition-colors shrink-0 min-h-[38px] cursor-pointer"
          aria-label="เปิดแผ่นตัวเลือกหมวดหมู่"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>เปลี่ยนหมวดหมู่</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet (Grab / LINE MAN style slide-up sheet) */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="เลือกหมวดหมู่เสื้อผ้า"
        subtitle="แตะหมวดหมู่ที่ต้องการเพื่อกรองคอลเลกชันทันที"
      >
        <div className="space-y-2 py-2">
          {/* Option: All */}
          <button
            type="button"
            onClick={() => handleSelectCategory("/discover")}
            className={`w-full flex items-center justify-between p-3.5 text-left border rounded-none transition-colors min-h-[48px] cursor-pointer ${
              !activeSlug
                ? "bg-olive-pale/40 border-olive text-charcoal font-semibold"
                : "bg-paper border-line text-charcoal hover:bg-paper-hover"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">ทั้งหมด</span>
              {totalCount !== undefined && (
                <span className="text-xs text-muted">({totalCount})</span>
              )}
            </div>
            {!activeSlug && <Check className="w-4 h-4 text-olive" />}
          </button>

          {/* Individual Categories */}
          {categories.map((cat) => {
            const isSelected = activeSlug === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(`/categories/${cat.slug}`)}
                className={`w-full flex items-center justify-between p-3.5 text-left border rounded-none transition-colors min-h-[48px] cursor-pointer ${
                  isSelected
                    ? "bg-olive-pale/40 border-olive text-charcoal font-semibold"
                    : "bg-paper border-line text-charcoal hover:bg-paper-hover"
                }`}
              >
                <span className="text-sm">{cat.name_th}</span>
                {isSelected && <Check className="w-4 h-4 text-olive" />}
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </div>
  );
}
