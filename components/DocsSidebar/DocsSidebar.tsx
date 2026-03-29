import { ALL_DOCS } from "../../pages/docs/DocsRegistry";
import styles from "./DocsSidebar.module.css";

interface DocsSidebarProps {
  activeSlug?: string;
}

export function DocsSidebar({ activeSlug }: DocsSidebarProps) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Documentation</h4>
        <ul className={styles.list}>
          {ALL_DOCS.map((doc) => (
            <li key={doc.slug} className={styles.item}>
              <a 
                href={`/docs/${doc.slug}`} 
                className={`${styles.link} ${activeSlug === doc.slug ? styles.active : ''}`}
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
