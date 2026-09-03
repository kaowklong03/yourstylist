import Link from "next/link";

export function DashboardNav({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <aside className="dashboard-nav">
      <Link href="/" className="wordmark">
        YOURSTYLIST
      </Link>
      <div>
        <p className="dashboard-nav-title">{title}</p>
        <nav aria-label={title}>
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="text-xs text-muted mb-3 space-y-0.5 pt-3 border-t border-line">
        <span className="block font-medium text-charcoal">ติดต่อเจ้าหน้าที่</span>
        <span className="block">LINE : @Yoursylist</span>
        <span className="block">เบอร์ 0888888888</span>
      </div>
      <form action="/api/auth/logout" method="post">
        <button className="button button-ghost" type="submit">
          ออกจากระบบ
        </button>
      </form>
    </aside>
  );
}

