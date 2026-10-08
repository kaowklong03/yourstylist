"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstMount = useRef(true);

  const clearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  };

  const startLoading = () => {
    clearAllTimers();

    setVisible(true);
    setIsLoading(true);
    setProgress(20);

    // Trickle progress to simulate realistic high-fashion network activity
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          return prev;
        }
        if (prev < 50) return prev + 15;
        if (prev < 75) return prev + 7;
        return prev + 2;
      });
    }, 200);

    // Safety timeout in case navigation is aborted or page stays
    safetyTimeoutRef.current = setTimeout(() => {
      finishLoading();
    }, 8000);
  };

  const finishLoading = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    setProgress(100);
    setIsLoading(false);

    // Keep at 100% briefly so user sees completion, then trigger CSS fade out
    fadeTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      // Reset width back to 0 after CSS fade-out transition completes
      resetTimeoutRef.current = setTimeout(() => {
        setProgress(0);
      }, 300);
    }, 250);
  };

  // Complete loading when route/searchParams changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    finishLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't trigger on modified clicks or non-primary clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore anchor targets like _blank, downloads, mailto, tel
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        // Only internal links
        if (url.origin !== window.location.origin) return;

        // Skip same page hash jumps (e.g. #main)
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return;
        }

        // Valid internal navigation link clicked
        startLoading();
      } catch {
        // invalid URL ignore
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    const handleCustomStart = () => {
      startLoading();
    };

    const handleCustomDone = () => {
      finishLoading();
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("route-change-start", handleCustomStart);
    window.addEventListener("route-change-done", handleCustomDone);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("route-change-start", handleCustomStart);
      window.removeEventListener("route-change-done", handleCustomDone);
      clearAllTimers();
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      role="progressbar"
      aria-label="กำลังโหลดหน้าเว็บ"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full relative transition-[width] duration-300 ease-out shadow-[0_0_10px_rgba(57,67,47,0.5)]"
        style={{
          width: `${progress}%`,
          backgroundColor: "var(--olive, #39432f)",
        }}
      >
        {/* Sleek fashion glow accent at leading edge */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-white/80 blur-[1px]" />
      </div>
    </div>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressIndicator />
    </Suspense>
  );
}
