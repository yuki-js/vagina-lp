import { useBrand } from "../../hooks/useBrand";
import styles from "./Footer.module.css";

export function Footer() {
  const brand = useBrand();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>{brand.name}</span>
          <span className={styles.tagline}>{brand.tagline}</span>
        </div>

        <div className={styles.links}>
          <a
            href={brand.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a href={brand.links.product} className={styles.link}>
            Product
          </a>
          <a href={brand.links.pricing} className={styles.link}>
            Pricing
          </a>
          <a href={brand.links.terms} className={styles.link}>
            Terms of Service
          </a>
          <a href={brand.links.privacy} className={styles.link}>
            Privacy Policy
          </a>
          <a href={brand.links.docs} className={styles.link}>
            Docs
          </a>
          <a href={brand.links.company} className={styles.link}>
            Company
          </a>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {brand.copyright}. All rights reserved.
          </p>
        </div>
        <div className={styles.footHero}>{brand.name}</div>
      </div>
    </footer>
  );
}
