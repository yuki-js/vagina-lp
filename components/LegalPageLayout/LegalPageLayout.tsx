import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import styles from "./LegalPageLayout.module.css";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className={styles.root}>
      <Header />

      <main className={styles.container}>
        <div className={`${styles.content} ${styles.reveal}`}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>{title}</h1>
            {lastUpdated && (
              <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
            )}
            <div className={styles.divider} />
          </header>

          <div className={styles.body}>{children}</div>
        </div>
      </main>

      <Footer />

      {/* Subtle background text decorative element */}
      <div className={styles.bgText}>LEGAL</div>
    </div>
  );
}
