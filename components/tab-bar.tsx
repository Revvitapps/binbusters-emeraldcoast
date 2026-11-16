"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, CircleHelp, House, MapPin, Tag } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", Icon: House },
  { href: "/pricing", label: "Prices", Icon: Tag },
  { href: "/book", label: "Book", Icon: CalendarCheck, center: true },
  { href: "/service-areas", label: "Areas", Icon: MapPin },
];

export function TabBar() {
  const path = usePathname() || "/";
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <nav className="tabbar" aria-label="App">
      {tabs.map(({ href, label, Icon, center }) => (
        <Link key={href} href={href} className={center ? "tab tab-center" : "tab"} aria-current={active(href) ? "page" : undefined}>
          <span className="tab-icon">
            <Icon aria-hidden size={center ? 24 : 21} />
          </span>
          <span className="tab-label">{label}</span>
        </Link>
      ))}
      <button type="button" className="tab" onClick={() => window.dispatchEvent(new Event("bb:ask"))}>
        <span className="tab-icon">
          <CircleHelp aria-hidden size={21} />
        </span>
        <span className="tab-label">Ask</span>
      </button>
    </nav>
  );
}
