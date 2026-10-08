"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, Shirt, User } from "lucide-react";
import type { CurrentUser } from "@/lib/auth";

export function MobileBottomNav({ user }: { user?: CurrentUser | null }) {
  const pathname = usePathname();

  // Strict scope: Customer / User experience only.
  // Do NOT render on Merchant Studio, Admin Console, or Merchant Auth routes.
  if (
    !pathname ||
    pathname.startsWith("/merchant") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login/merchant") ||
    pathname.startsWith("/register/merchant")
  ) {
    return null;
  }

  const isHome = pathname === "/";
  const isDiscover =
    pathname === "/discover" ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/shops") ||
    pathname.startsWith("/ads");
  const isStylist = pathname.startsWith("/ai-stylist");
  const isWardrobe = pathname.startsWith("/account/wardrobe");
  const isAccount = user
    ? pathname.startsWith("/account") && !isWardrobe
    : pathname.startsWith("/login/customer");

  const isMerchantUser = user?.role === "merchant";
  const accountHref = isMerchantUser
    ? "/merchant"
    : user
    ? "/account"
    : "/login/customer";
  const accountLabel = isMerchantUser
    ? "ร้านค้า"
    : user
    ? "บัญชีของฉัน"
    : "เข้าสู่ระบบ";

  return (
    <>
      {/* Safe bottom spacer for mobile viewports (dynamic height with safe-area for iPhone home bar) */}
      <div
        className="h-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:hidden w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating / sleek fixed bottom navigation bar for mobile thumb navigation */}
      <nav
        aria-label="แถบเมนูด้านล่างสำหรับมือถือ"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-line shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
          {/* 1. หน้าแรก (Home) */}
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors ${
              isHome
                ? "text-charcoal font-semibold"
                : "text-muted hover:text-charcoal"
            }`}
          >
            <Home className={`w-5 h-5 transition-transform ${isHome ? "scale-110 text-olive" : ""}`} />
            <span className="text-[11px] leading-tight mt-1 truncate">หน้าแรก</span>
            {isHome && <span className="w-1 h-1 rounded-full bg-olive mt-0.5" />}
          </Link>

          {/* 2. ค้นหาสไตล์ / Lookbook */}
          <Link
            href="/discover"
            aria-current={isDiscover ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors ${
              isDiscover
                ? "text-charcoal font-semibold"
                : "text-muted hover:text-charcoal"
            }`}
          >
            <Compass className={`w-5 h-5 transition-transform ${isDiscover ? "scale-110 text-olive" : ""}`} />
            <span className="text-[11px] leading-tight mt-1 truncate">ค้นหาสไตล์</span>
            {isDiscover && <span className="w-1 h-1 rounded-full bg-olive mt-0.5" />}
          </Link>

          {/* 3. AI Stylist (Signature Primary Action) */}
          <Link
            href="/ai-stylist"
            aria-current={isStylist ? "page" : undefined}
            className="flex flex-col items-center justify-center py-1 px-1 min-h-[48px] relative group"
          >
            <div
              className={`w-10 h-10 -mt-3.5 rounded-full flex items-center justify-center shadow-md border transition-all ${
                isStylist
                  ? "bg-olive text-background border-olive scale-105 shadow-olive/20"
                  : "bg-charcoal text-background border-charcoal/20 group-hover:bg-olive"
              }`}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span
              className={`text-[11px] leading-tight mt-0.5 font-medium truncate ${
                isStylist ? "text-olive font-semibold" : "text-charcoal"
              }`}
            >
              AI สไตลิสต์
            </span>
          </Link>

          {/* 4. ตู้เสื้อผ้า */}
          <Link
            href="/account/wardrobe"
            aria-current={isWardrobe ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors ${
              isWardrobe
                ? "text-charcoal font-semibold"
                : "text-muted hover:text-charcoal"
            }`}
          >
            <Shirt className={`w-5 h-5 transition-transform ${isWardrobe ? "scale-110 text-olive" : ""}`} />
            <span className="text-[11px] leading-tight mt-1 truncate">ตู้เสื้อผ้า</span>
            {isWardrobe && <span className="w-1 h-1 rounded-full bg-olive mt-0.5" />}
          </Link>

          {/* 5. บัญชีของฉัน / เข้าสู่ระบบ */}
          <Link
            href={accountHref}
            aria-current={isAccount ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors ${
              isAccount
                ? "text-charcoal font-semibold"
                : "text-muted hover:text-charcoal"
            }`}
          >
            <User className={`w-5 h-5 transition-transform ${isAccount ? "scale-110 text-olive" : ""}`} />
            <span className="text-[11px] leading-tight mt-1 truncate">{accountLabel}</span>
            {isAccount && <span className="w-1 h-1 rounded-full bg-olive mt-0.5" />}
          </Link>
        </div>
      </nav>
    </>
  );
}
