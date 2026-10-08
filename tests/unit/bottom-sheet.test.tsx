// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BottomSheet } from "@/components/ui/bottom-sheet";

describe("BottomSheet Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("does not render when isOpen is false", () => {
    render(
      <BottomSheet isOpen={false} onClose={vi.fn()}>
        <div>Content</div>
      </BottomSheet>
    );

    expect(screen.queryByText("Content")).toBeNull();
  });

  it("renders title, subtitle, and children when isOpen is true", () => {
    render(
      <BottomSheet
        isOpen={true}
        onClose={vi.fn()}
        title="เลือกตัวเลือก"
        subtitle="คำอธิบายเพิ่มเติม"
      >
        <div>Sheet Inner Body</div>
      </BottomSheet>
    );

    expect(screen.getByText("เลือกตัวเลือก")).toBeInTheDocument();
    expect(screen.getByText("คำอธิบายเพิ่มเติม")).toBeInTheDocument();
    expect(screen.getByText("Sheet Inner Body")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <BottomSheet isOpen={true} onClose={handleClose} title="หัวข้อ">
        <div>Content</div>
      </BottomSheet>
    );

    const closeBtn = screen.getByLabelText("ปิดหน้าต่างตัวเลือก");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <BottomSheet isOpen={true} onClose={handleClose} title="หัวข้อ">
        <div>Content</div>
      </BottomSheet>
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop overlay is clicked", () => {
    const handleClose = vi.fn();
    const { container } = render(
      <BottomSheet isOpen={true} onClose={handleClose} title="หัวข้อ">
        <div>Content</div>
      </BottomSheet>
    );

    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it("calls onClose when swiped down by more than 80px", () => {
    const handleClose = vi.fn();
    render(
      <BottomSheet isOpen={true} onClose={handleClose} title="หัวข้อ">
        <div>Content</div>
      </BottomSheet>
    );

    const handle = screen.getByLabelText("ลากลงเพื่อปิด");
    fireEvent.touchStart(handle, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(handle, { touches: [{ clientY: 210 }] }); // delta = 110px > 80px
    fireEvent.touchEnd(handle);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("includes adaptive classes for desktop modal and mobile bottom sheet", () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={vi.fn()} title="หัวข้อ">
        <div>Content</div>
      </BottomSheet>
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toHaveClass("justify-end");
    expect(dialog).toHaveClass("md:justify-center");

    const sheetContainer = container.querySelector('.relative.z-10');
    expect(sheetContainer).toHaveClass("md:max-w-lg");
    expect(sheetContainer).toHaveClass("rounded-t-2xl");
  });
});
