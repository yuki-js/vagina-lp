import { useBrand } from "../../hooks/useBrand";
import styles from "./Header.module.css";

export function Header() {
  const brand = useBrand();

  const navItems = [
    { label: "Product", href: brand.links.product },
    { label: "Pricing", href: brand.links.pricing },
    { label: "Docs", href: brand.links.docs },
  ];

  return (
    <header className={styles.header}>
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

        <a href={brand.links.app} className={styles.ctaButton}>
          Early Access
        </a>
      </div>
    </header>
  );
}
