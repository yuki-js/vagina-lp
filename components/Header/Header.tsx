import { useEffect, useState } from "react";
import { BRAND } from "../../config/brand";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Product", href: BRAND.links.product },
  { label: "Pricing", href: BRAND.links.pricing },
  { label: "Docs", href: BRAND.links.docs },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          {BRAND.name}
        </a>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#waitlist" className={styles.ctaButton}>
          Early Access
        </a>
      </div>
    </header>
  );
}
