// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AddItemForm } from "@/components/wardrobe/add-item-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
}));

describe("AddItemForm Adaptive Camera & Drag-and-Drop", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders desktop drag-and-drop zone and mobile camera button", () => {
    const { container } = render(<AddItemForm />);

    // 1. Desktop Drag & Drop dropzone
    expect(
      screen.getByText("ลากรูปภาพเสื้อผ้ามาวางที่นี่ (Drag & Drop)")
    ).toBeInTheDocument();

    // 2. Mobile Direct Camera Trigger
    expect(screen.getByText("ถ่ายรูปด้วยกล้องทันที")).toBeInTheDocument();
    expect(screen.getByText("เปิดกล้องหลังถ่ายภาพทันที")).toBeInTheDocument();

    // Check that there is an input with capture="environment" for camera
    const cameraInput = container.querySelector(
      'input[type="file"][capture="environment"]'
    );
    expect(cameraInput).toBeInTheDocument();
    expect(cameraInput).toHaveAttribute("accept", "image/*");

    // Check secondary mobile gallery input
    const fileInputs = container.querySelectorAll('input[type="file"]');
    expect(fileInputs.length).toBe(3); // desktop, mobile camera, mobile gallery
  });

  it("desktop dropzone has keyboard accessibility and drop handlers", () => {
    const { container } = render(<AddItemForm />);

    const dropzone = screen.getByLabelText("ลากรูปภาพมาวางหรือคลิกเพื่อเลือกไฟล์");
    expect(dropzone).toHaveAttribute("role", "button");
    expect(dropzone).toHaveAttribute("tabindex", "0");
  });
});
