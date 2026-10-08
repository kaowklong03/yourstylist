"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  triggerAriaLabel?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = "",
}: BottomSheetProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setDragOffset(0);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Touch Swipe-down drag gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    currentYRef.current = e.touches[0].clientY;
    const delta = currentYRef.current - startYRef.current;
    if (delta > 0) {
      setDragOffset(delta);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = currentYRef.current - startYRef.current;
    if (delta > 80) {
      // Swiped down sufficiently -> dismiss
      onClose();
    }
    setDragOffset(0);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center md:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : "แผ่นตัวเลือก"}
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Adaptive Sheet / Modal container */}
      <div
        ref={sheetRef}
        style={{
          transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
          transition: isDragging ? "none" : "transform 250ms ease-out",
        }}
        className={`relative z-10 w-full md:max-w-lg max-h-[88vh] md:max-h-[85vh] bg-background border-t md:border border-line rounded-t-2xl md:rounded-xl shadow-2xl flex flex-col pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:pb-4 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-200 ${className}`}
      >
        {/* Swipe-down handle zone (Mobile only) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="pt-3 pb-2 cursor-grab active:cursor-grabbing flex flex-col items-center justify-center select-none md:hidden"
          aria-label="ลากลงเพื่อปิด"
        >
          <div className="w-12 h-1.5 bg-line-strong/60 rounded-full" />
        </div>

        {/* Header - also supports swipe down on mobile */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex items-center justify-between px-5 py-3 border-b border-line/70 select-none md:select-auto"
        >
          <div>
            {title && (
              <h3 className="font-serif text-lg font-medium text-charcoal leading-snug">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-muted mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-muted hover:text-charcoal hover:bg-paper rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="ปิดหน้าต่างตัวเลือก"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 flex-1 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
