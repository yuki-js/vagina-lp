import { BRAND } from "../../config/brand";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>{BRAND.name}</span>
          <span className={styles.tagline}>{BRAND.tagline}</span>
        </div>

        <div className={styles.links}>
          <a
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a href={BRAND.links.product} className={styles.link}>
            Product
          </a>
          <a href={BRAND.links.pricing} className={styles.link}>
            Pricing
          </a>
          <a href={BRAND.links.terms} className={styles.link}>
            Terms of Service
          </a>
          <a href={BRAND.links.privacy} className={styles.link}>
            Privacy Policy
          </a>
          <a href={BRAND.links.docs} className={styles.link}>
            Docs
          </a>
          <a href={BRAND.links.company} className={styles.link}>
            Company
          </a>
        </div>

        <div className={styles.footHero}>VAGINA</div>
      </div>
    </footer>
  );
}
