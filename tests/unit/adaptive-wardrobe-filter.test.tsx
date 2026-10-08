// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { AdaptiveWardrobeFilter } from "@/components/wardrobe/adaptive-wardrobe-filter";
import type { WardrobeItemType, WardrobeAvailabilityStatus } from "@/lib/types";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("AdaptiveWardrobeFilter Component", () => {
  const categories: { key: WardrobeItemType | "all"; label: string }[] = [
    { key: "all", label: "ทั้งหมด" },
    { key: "top", label: "เสื้อ" },
    { key: "bottom", label: "กางเกง" },
  ];

  const statusFilters: { key: WardrobeAvailabilityStatus | "all"; label: string }[] = [
    { key: "all", label: "ทุกสถานะ" },
    { key: "available", label: "พร้อมใส่" },
    { key: "laundry", label: "อยู่ในตะกร้าซัก" },
  ];

  afterEach(() => {
    cleanup();
    mockPush.mockClear();
  });

  it("renders desktop filter toolbar and mobile trigger", () => {
    render(
      <AdaptiveWardrobeFilter
        categories={categories}
        statusFilters={statusFilters}
        currentType="all"
        currentStatus="all"
        favoriteOnly={false}
      />
    );

    expect(screen.getByText("ปรับแต่งตัวกรอง")).toBeInTheDocument();
    expect(screen.getAllByText("เสื้อ").length).toBeGreaterThanOrEqual(1);
  });

  it("opens mobile bottom sheet on trigger tap and applies filters", () => {
    render(
      <AdaptiveWardrobeFilter
        categories={categories}
        statusFilters={statusFilters}
        currentType="all"
        currentStatus="all"
        favoriteOnly={false}
      />
    );

    const trigger = screen.getByText("ปรับแต่งตัวกรอง");
    fireEvent.click(trigger);

    expect(screen.getAllByText("ตัวกรองเสื้อผ้า").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("นำตัวกรองไปใช้")).toBeInTheDocument();

    // Tap "เสื้อ" in bottom sheet
    const topButtons = screen.getAllByText("เสื้อ");
    fireEvent.click(topButtons[topButtons.length - 1]);

    // Tap "นำตัวกรองไปใช้"
    const applyBtn = screen.getByText("นำตัวกรองไปใช้");
    fireEvent.click(applyBtn);

    expect(mockPush).toHaveBeenCalledWith("/account/wardrobe?type=top");
  });

  it("opens modal from desktop 'เปิดหน้าต่างปรับแต่ง' button", () => {
    render(
      <AdaptiveWardrobeFilter
        categories={categories}
        statusFilters={statusFilters}
        currentType="all"
        currentStatus="all"
        favoriteOnly={false}
      />
    );

    const desktopTrigger = screen.getByLabelText("เปิดหน้าต่างปรับแต่งตัวกรอง (Desktop Modal)");
    fireEvent.click(desktopTrigger);

    expect(screen.getByText("นำตัวกรองไปใช้")).toBeInTheDocument();
  });

  it("opens bottom sheet when tapping mobile active filter badge", () => {
    render(
      <AdaptiveWardrobeFilter
        categories={categories}
        statusFilters={statusFilters}
        currentType="top"
        currentStatus="all"
        favoriteOnly={false}
      />
    );

    const activeTopChip = screen.getByText("ประเภท: เสื้อ");
    fireEvent.click(activeTopChip);

    expect(screen.getByText("นำตัวกรองไปใช้")).toBeInTheDocument();
  });
});
