import { useEffect, useState } from "react";
import { useBrand } from "../../hooks/useBrand";
import styles from "./Header.module.css";

export function Header() {
  const brand = useBrand();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Product", href: brand.links.product },
    { label: "Pricing", href: brand.links.pricing },
    { label: "Docs", href: brand.links.docs },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          {brand.name}
        </a>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
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
