import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { DocsSidebar } from "../DocsSidebar/DocsSidebar";
import styles from "./DocsPageLayout.module.css";

interface DocsPageLayoutProps {
  title: string;
  activeSlug?: string;
  children: React.ReactNode;
}

export function DocsPageLayout({
  title,
  activeSlug,
  children,
}: DocsPageLayoutProps) {
  return (
    <div className={styles.root}>
      <Header />

      <main className={styles.container}>
        <div className={styles.layoutWrapper}>
          <DocsSidebar activeSlug={activeSlug} />

          <div className={`${styles.content} ${styles.reveal}`}>
            <header className={styles.pageHeader}>
              <div className={styles.breadcrumb}>Documentation / {title}</div>
              <h1 className={styles.title}>{title}</h1>
            </header>

            <div className={styles.body}>{children}</div>
          </div>
        </div>
      </main>

      <Footer />

      <div className={styles.bgText}>DOCS</div>
    </div>
  );
}
