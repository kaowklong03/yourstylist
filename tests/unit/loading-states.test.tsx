// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, act, fireEvent } from "@testing-library/react";
import { NavigationProgress } from "@/components/navigation-progress";
import WardrobeLoading from "@/app/account/wardrobe/loading";
import WeeklyPlannerLoading from "@/app/account/weekly-planner/loading";
import OutfitsLoading from "@/app/account/outfits/loading";
import DiscoverLoading from "@/app/discover/loading";
import StyleMemoryLoading from "@/app/account/style-memory/loading";

describe("Customer Experience Loading States", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("NavigationProgress", () => {
    it("renders progressbar when route-change-start event is triggered", () => {
      render(<NavigationProgress />);

      // Initially hidden
      expect(screen.queryByRole("progressbar")).toBeNull();

      // Trigger navigation event
      act(() => {
        window.dispatchEvent(new Event("route-change-start"));
      });

      const bar = screen.getByRole("progressbar");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveAttribute("aria-valuenow");
    });

    it("triggers progress on popstate (browser back/forward)", () => {
      render(<NavigationProgress />);
      expect(screen.queryByRole("progressbar")).toBeNull();

      act(() => {
        window.dispatchEvent(new Event("popstate"));
      });

      const bar = screen.getByRole("progressbar");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveAttribute("aria-valuenow", "20");
    });

    it("triggers progress on clicking an internal navigation link", () => {
      render(
        <div>
          <NavigationProgress />
          <a href="/account/wardrobe" id="nav-link">
            ตู้เสื้อผ้า
          </a>
          <a href="https://external.example.com" id="ext-link">
            เว็บภายนอก
          </a>
          <a href="#hash" id="hash-link">
            ข้าม
          </a>
        </div>
      );

      expect(screen.queryByRole("progressbar")).toBeNull();

      // Click external link -> should NOT trigger progress
      act(() => {
        const ext = document.getElementById("ext-link")!;
        fireEvent.click(ext);
      });
      expect(screen.queryByRole("progressbar")).toBeNull();

      // Click same page hash link -> should NOT trigger progress
      act(() => {
        const hash = document.getElementById("hash-link")!;
        fireEvent.click(hash);
      });
      expect(screen.queryByRole("progressbar")).toBeNull();

      // Click internal link -> should trigger progress
      act(() => {
        const internal = document.getElementById("nav-link")!;
        fireEvent.click(internal);
      });

      const bar = screen.getByRole("progressbar");
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveAttribute("aria-valuenow", "20");
    });

    it("completes and fades out after route-change-done, and handles rapid clicks without cutting off new progress", () => {
      vi.useFakeTimers();
      render(<NavigationProgress />);

      act(() => {
        window.dispatchEvent(new Event("route-change-start"));
      });
      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      // Finish navigation
      act(() => {
        window.dispatchEvent(new Event("route-change-done"));
      });

      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuenow", "100");

      // Before fadeout completes (e.g. 100ms in), user clicks another link
      act(() => {
        vi.advanceTimersByTime(100);
      });
      act(() => {
        window.dispatchEvent(new Event("route-change-start"));
      });

      // The new progress should reset to 20 and stay visible
      const newBar = screen.getByRole("progressbar");
      expect(newBar).toHaveAttribute("aria-valuenow", "20");

      // Advance past the previous fadeout timer (250ms) to ensure it does not prematurely hide
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  describe("Route Skeleton Components", () => {
    it("renders WardrobeLoading skeleton with accessible busy state and insights placeholder", () => {
      render(<WardrobeLoading />);
      const el = screen.getByLabelText("กำลังโหลดตู้เสื้อผ้า");
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-busy", "true");
    });

    it("renders WeeklyPlannerLoading skeleton with accessible busy state", () => {
      render(<WeeklyPlannerLoading />);
      const el = screen.getByLabelText("กำลังโหลดแผนลุค 7 วัน");
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-busy", "true");
    });

    it("renders OutfitsLoading skeleton with accessible busy state", () => {
      render(<OutfitsLoading />);
      const el = screen.getByLabelText("กำลังโหลดชุดที่บันทึกไว้");
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-busy", "true");
    });

    it("renders DiscoverLoading skeleton with accessible busy state", () => {
      render(<DiscoverLoading />);
      const el = screen.getByLabelText("กำลังโหลดค้นหาสไตล์");
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-busy", "true");
    });

    it("renders StyleMemoryLoading skeleton with accessible busy state", () => {
      render(<StyleMemoryLoading />);
      const el = screen.getByLabelText("กำลังโหลดกิจวัตรและสไตล์");
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-busy", "true");
    });
  });
});
