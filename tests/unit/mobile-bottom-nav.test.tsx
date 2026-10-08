// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import type { CurrentUser } from "@/lib/auth";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("MobileBottomNav Component", () => {
  afterEach(() => {
    cleanup();
    mockPathname = "/";
  });

  it("renders 5 thumb navigation buttons for guests on home page", () => {
    mockPathname = "/";
    render(<MobileBottomNav user={null} />);

    expect(screen.getByText("หน้าแรก")).toBeInTheDocument();
    expect(screen.getByText("ค้นหาสไตล์")).toBeInTheDocument();
    expect(screen.getByText("AI สไตลิสต์")).toBeInTheDocument();
    expect(screen.getByText("ตู้เสื้อผ้า")).toBeInTheDocument();
    expect(screen.getByText("เข้าสู่ระบบ")).toBeInTheDocument();

    const homeLink = screen.getByText("หน้าแรก").closest("a");
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("links to /account with 'บัญชีของฉัน' for authenticated customer", () => {
    mockPathname = "/account";
    const customerUser: CurrentUser = {
      id: "cust-1",
      email: "customer@example.com",
      role: "customer",
      displayName: "Jane Customer",
      avatarUrl: null,
    };

    render(<MobileBottomNav user={customerUser} />);

    expect(screen.getByText("บัญชีของฉัน")).toBeInTheDocument();
    const accountLink = screen.getByText("บัญชีของฉัน").closest("a");
    expect(accountLink).toHaveAttribute("href", "/account");
    expect(accountLink).toHaveAttribute("aria-current", "page");
  });

  it("highlights active state on /account/wardrobe", () => {
    mockPathname = "/account/wardrobe";
    render(<MobileBottomNav user={null} />);

    const wardrobeLink = screen.getByText("ตู้เสื้อผ้า").closest("a");
    expect(wardrobeLink).toHaveAttribute("aria-current", "page");
  });

  it("strictly hides and returns null on merchant console routes", () => {
    mockPathname = "/merchant/dashboard";
    const { container } = render(<MobileBottomNav user={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("strictly hides and returns null on admin console routes", () => {
    mockPathname = "/admin/users";
    const { container } = render(<MobileBottomNav user={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("strictly hides and returns null on merchant auth routes", () => {
    mockPathname = "/login/merchant";
    const { container: loginContainer } = render(<MobileBottomNav user={null} />);
    expect(loginContainer.firstChild).toBeNull();

    cleanup();
    mockPathname = "/register/merchant";
    const { container: regContainer } = render(<MobileBottomNav user={null} />);
    expect(regContainer.firstChild).toBeNull();
  });

  it("links to /merchant with 'ร้านค้า' when logged in user is merchant", () => {
    mockPathname = "/";
    const merchantUser: CurrentUser = {
      id: "merch-1",
      email: "shop@example.com",
      role: "merchant",
      displayName: "Shop Owner",
      avatarUrl: null,
    };

    render(<MobileBottomNav user={merchantUser} />);

    expect(screen.getByText("ร้านค้า")).toBeInTheDocument();
    const merchantLink = screen.getByText("ร้านค้า").closest("a");
    expect(merchantLink).toHaveAttribute("href", "/merchant");
  });
});
