"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Filter, SlidersHorizontal, Heart, Check, RotateCcw } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import type { WardrobeItemType, WardrobeAvailabilityStatus } from "@/lib/types";

interface CategoryOption {
  key: WardrobeItemType | "all";
  label: string;
}

interface StatusOption {
  key: WardrobeAvailabilityStatus | "all";
  label: string;
}

interface AdaptiveWardrobeFilterProps {
  categories: CategoryOption[];
  statusFilters: StatusOption[];
  currentType: WardrobeItemType | "all";
  currentStatus: WardrobeAvailabilityStatus | "all";
  favoriteOnly: boolean;
}

function buildHref(type: string, status: string, favorite: boolean) {
  const p = new URLSearchParams();
  if (type !== "all") p.set("type", type);
  if (status !== "all") p.set("status", status);
  if (favorite) p.set("favorite", "true");
  const qs = p.toString();
  return qs ? `/account/wardrobe?${qs}` : "/account/wardrobe";
}

export function AdaptiveWardrobeFilter({
  categories,
  statusFilters,
  currentType,
  currentStatus,
  favoriteOnly,
}: AdaptiveWardrobeFilterProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Staged state for mobile bottom sheet
  const [stagedType, setStagedType] = useState<WardrobeItemType | "all">(currentType);
  const [stagedStatus, setStagedStatus] = useState<WardrobeAvailabilityStatus | "all">(currentStatus);
  const [stagedFavorite, setStagedFavorite] = useState<boolean>(favoriteOnly);

  const handleOpenSheet = () => {
    setStagedType(currentType);
    setStagedStatus(currentStatus);
    setStagedFavorite(favoriteOnly);
    setIsSheetOpen(true);
  };

  const handleApply = () => {
    setIsSheetOpen(false);
    const href = buildHref(stagedType, stagedStatus, stagedFavorite);
    router.push(href);
  };

  const handleReset = () => {
    setStagedType("all");
    setStagedStatus("all");
    setStagedFavorite(false);
    setIsSheetOpen(false);
    router.push("/account/wardrobe");
  };

  const activeCategoryLabel = categories.find((c) => c.key === currentType)?.label || "ทั้งหมด";
  const activeStatusLabel = statusFilters.find((s) => s.key === currentStatus)?.label || "ทุกสถานะ";
  const hasActiveFilters = currentType !== "all" || currentStatus !== "all" || favoriteOnly;

  return (
    <>
      {/* 1. Desktop View (hidden on mobile, visible on md and up) */}
      <div className="hidden md:block space-y-4 bg-paper border border-line p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase">
            <Filter className="w-3.5 h-3.5 text-olive" />
            <span>ตัวกรองเสื้อผ้า</span>
          </div>
          <button
            type="button"
            onClick={handleOpenSheet}
            className="text-xs text-muted hover:text-charcoal inline-flex items-center gap-1 cursor-pointer transition-colors"
            aria-label="เปิดหน้าต่างปรับแต่งตัวกรอง (Desktop Modal)"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-olive" />
            <span>เปิดหน้าต่างปรับแต่ง</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = currentType === cat.key;
            const href = buildHref(cat.key, currentStatus, favoriteOnly);

            return (
              <Link
                key={cat.key}
                href={href}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                  isActive
                    ? "bg-charcoal text-background border-charcoal"
                    : "bg-background text-charcoal border-line hover:border-charcoal"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Status & Favorite Filter */}
        <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-muted font-medium">สถานะ:</span>
            {statusFilters.map((s) => {
              const isActive = currentStatus === s.key;
              const href = buildHref(currentType, s.key, favoriteOnly);

              return (
                <Link
                  key={s.key}
                  href={href}
                  className={`px-2.5 py-1 rounded-none font-medium transition-colors ${
                    isActive
                      ? "bg-charcoal text-background"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>

          <div>
            <Link
              href={buildHref(currentType, currentStatus, !favoriteOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 border transition-colors ${
                favoriteOnly
                  ? "bg-danger/10 border-danger text-danger"
                  : "border-line text-muted hover:text-charcoal"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoriteOnly ? "fill-current" : ""}`} />
              <span>เฉพาะที่ถูกใจ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Mobile View (visible only on md:hidden) - Bottom Sheet Trigger Bar */}
      <div className="md:hidden bg-paper border border-line p-3.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase">
            <Filter className="w-3.5 h-3.5 text-olive" />
            <span>ตัวกรองตู้เสื้อผ้า</span>
          </div>

          <button
            type="button"
            onClick={handleOpenSheet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal text-background hover:bg-olive text-xs font-medium rounded-none transition-colors min-h-[38px] cursor-pointer"
            aria-label="เปิดตัวกรองในแผ่นสไลด์"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>ปรับแต่งตัวกรอง</span>
          </button>
        </div>

        {/* Active Filters Summary Chips on Mobile */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          {hasActiveFilters ? (
            <>
              {currentType !== "all" && (
                <button
                  type="button"
                  onClick={handleOpenSheet}
                  className="px-2 py-0.5 bg-background border border-charcoal text-charcoal font-medium text-[11px] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>ประเภท: {activeCategoryLabel}</span>
                </button>
              )}
              {currentStatus !== "all" && (
                <button
                  type="button"
                  onClick={handleOpenSheet}
                  className="px-2 py-0.5 bg-background border border-line text-charcoal text-[11px] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>สถานะ: {activeStatusLabel}</span>
                </button>
              )}
              {favoriteOnly && (
                <button
                  type="button"
                  onClick={handleOpenSheet}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-danger/10 border border-danger text-danger text-[11px] cursor-pointer"
                >
                  <Heart className="w-3 h-3 fill-current" />
                  <span>ถูกใจ</span>
                </button>
              )}
              <Link
                href="/account/wardrobe"
                className="text-[11px] text-muted hover:text-charcoal underline ml-1"
              >
                ล้างทั้งหมด
              </Link>
            </>
          ) : (
            <span className="text-[11px] text-muted">แสดงเสื้อผ้าทุกประเภทและทุกสถานะ</span>
          )}
        </div>
      </div>

      {/* 3. Mobile Bottom Sheet (Grab / LINE MAN style slide-up sheet) */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="ตัวกรองเสื้อผ้า"
        subtitle="ปรับแต่งหมวดหมู่ สถานะความพร้อม และรายการโปรด"
      >
        <div className="space-y-6 py-2">
          {/* Section: Category */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-muted uppercase">
              1. ประเภทเสื้อผ้า
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = stagedType === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setStagedType(cat.key)}
                    className={`p-2.5 text-xs font-medium text-left border rounded-none flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                      isSelected
                        ? "bg-charcoal text-background border-charcoal font-semibold"
                        : "bg-paper text-charcoal border-line hover:border-charcoal"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-background" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Status */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-muted uppercase">
              2. สถานะการใช้งาน
            </label>
            <div className="grid grid-cols-2 gap-2">
              {statusFilters.map((s) => {
                const isSelected = stagedStatus === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStagedStatus(s.key)}
                    className={`p-2.5 text-xs font-medium text-left border rounded-none flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                      isSelected
                        ? "bg-olive text-background border-olive font-semibold"
                        : "bg-paper text-charcoal border-line hover:border-olive"
                    }`}
                  >
                    <span>{s.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-background" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Favorites */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-muted uppercase">
              3. รายการโปรด
            </label>
            <button
              type="button"
              onClick={() => setStagedFavorite(!stagedFavorite)}
              className={`w-full p-3 text-xs font-medium border flex items-center justify-between transition-colors min-h-[48px] cursor-pointer ${
                stagedFavorite
                  ? "bg-danger/10 border-danger text-danger font-semibold"
                  : "bg-paper border-line text-charcoal hover:border-charcoal"
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${stagedFavorite ? "fill-current" : ""}`} />
                <span>เฉพาะเสื้อผ้าที่ติดดาวถูกใจ</span>
              </div>
              {stagedFavorite && <Check className="w-4 h-4 text-danger" />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-line flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 px-4 border border-line bg-paper hover:bg-background text-charcoal text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors min-h-[44px] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-muted" />
              <span>ล้างตัวกรอง</span>
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-3 px-4 bg-charcoal text-background hover:bg-olive text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors min-h-[44px] cursor-pointer shadow-sm"
            >
              <span>นำตัวกรองไปใช้</span>
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
