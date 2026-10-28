"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./icon";
import CopyEmail from "./copy-email";
const links = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header" id="home">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link
          href="/"
          className="wordmark"
          aria-label="Mukhtar Bello home"
          onClick={() => setOpen(false)}
        >
          M<span>B</span>
          <i />
        </Link>
        <div className="header-email">
          <CopyEmail compact />
        </div>
        <div className="nav-actions">
          <ul id="nav-menu" className={`nav-links ${open ? "is-open" : ""}`}>
            <li>
              <Link
                href="/"
                aria-label="Home"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon name="home" size={17} />
              </Link>
            </li>
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="menu-button"
            type="button"
            aria-controls="nav-menu"
            aria-expanded={open}
            aria-label={`${open ? "Close" : "Open"} main menu`}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>
    </header>
  );
}
