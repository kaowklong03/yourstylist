import Link from "next/link";

const links = [
  ["/merchant", "ภาพรวม"],
  ["/merchant/shop", "ร้านค้า"],
  ["/merchant/ads", "โฆษณา"],
  ["/merchant/analytics", "สถิติ"],
  ["/merchant/settings", "ตั้งค่า"],
];

export function MerchantNav() {
  return (
    <aside className="dashboard-nav" aria-label="เมนูร้านค้า">
      <p className="dashboard-nav-title">Merchant Studio</p>
      {links.map(([href, label]) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
      <div className="text-xs text-muted mb-3 space-y-0.5 pt-3 border-t border-line">
        <span className="block font-medium text-charcoal">ติดต่อเจ้าหน้าที่</span>
        <span className="block">LINE : @Yoursylist</span>
        <span className="block">เบอร์ 0888888888</span>
      </div>
      <form action="/api/auth/logout" method="post">
        <button type="submit">ออกจากระบบ</button>
      </form>
    </aside>
  );
}
