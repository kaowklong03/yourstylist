// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { AdaptiveCategoryFilter } from "@/components/catalog/adaptive-category-filter";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("AdaptiveCategoryFilter Component", () => {
  const dummyCategories = [
    { id: "cat-1", slug: "shirts", name_th: "เสื้อเชิ้ต" },
    { id: "cat-2", slug: "pants", name_th: "กางเกง" },
  ];

  afterEach(() => {
    cleanup();
    mockPush.mockClear();
  });

  it("renders desktop inline pills and mobile trigger button", () => {
    render(
      <AdaptiveCategoryFilter
        categories={dummyCategories}
        activeSlug="shirts"
        totalCount={42}
      />
    );

    // Desktop nav
    const desktopNav = screen.getByLabelText("กรองตามหมวดหมู่ (Desktop)");
    expect(desktopNav).toBeInTheDocument();
    expect(screen.getAllByText("เสื้อเชิ้ต").length).toBeGreaterThanOrEqual(1);

    // Mobile trigger button
    const mobileTrigger = screen.getByLabelText("เปิดแผ่นตัวเลือกหมวดหมู่");
    expect(mobileTrigger).toBeInTheDocument();
  });

  it("opens mobile bottom sheet on trigger tap and allows category selection", () => {
    render(
      <AdaptiveCategoryFilter
        categories={dummyCategories}
        activeSlug="shirts"
        totalCount={42}
      />
    );

    const mobileTrigger = screen.getByLabelText("เปิดแผ่นตัวเลือกหมวดหมู่");
    fireEvent.click(mobileTrigger);

    // Bottom sheet should be visible
    expect(screen.getByText("เลือกหมวดหมู่เสื้อผ้า")).toBeInTheDocument();

    // Select category "กางเกง" in the bottom sheet
    const pantsButtons = screen.getAllByText("กางเกง");
    // Find the one inside the bottom sheet
    fireEvent.click(pantsButtons[pantsButtons.length - 1]);

    expect(mockPush).toHaveBeenCalledWith("/categories/pants");
  });

  it("opens modal on desktop 'ตัวเลือกทั้งหมด' button click", () => {
    render(
      <AdaptiveCategoryFilter
        categories={dummyCategories}
        activeSlug="shirts"
        totalCount={42}
      />
    );

    const desktopModalTrigger = screen.getByLabelText("เปิดหน้าต่างตัวเลือกหมวดหมู่ทั้งหมด (Desktop Modal)");
    expect(desktopModalTrigger).toBeInTheDocument();

    fireEvent.click(desktopModalTrigger);
    expect(screen.getByText("เลือกหมวดหมู่เสื้อผ้า")).toBeInTheDocument();
  });
});
